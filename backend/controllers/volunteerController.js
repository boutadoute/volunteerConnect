import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Volunteer from "../models/volunteerModel.js";
import mongoose from "mongoose";
import redis from "redis";
import Role from "../models/roleModel.js"

export const register = asyncHandler(async (req , res) => {

    const { name , email , password , phone_number, city } = req.body;

    const verifyEmail = await Volunteer.findOne({ email: email });

    try {
        
        if (verifyEmail) {

            return res.status(403).json({ message: "Email already exist !" });

        } else {

            bcrypt.hash(req.body.password , 10)
                .then((hash) => {

                    const volunteer = new Volunteer({

                        name: name,
                        email: email,
                        password: hash,
                        phone_number: phone_number,
                        city:city,

                    })

                    volunteer.save()
                        .then((response) => {

                            return res.status(201).json({

                                message: "Volunteer successfuly created !",
                                result: response

                            })

                        })
                        .catch((err) => {

                            res.status(500).json({ error: err });

                        })

                });

        }

    } catch (error) {
        
        return res.status(412).send({

            message: error.message

        })

    }

});

export const login = asyncHandler( async (req , res) => {

    const { email , password } = req.body;
    
    let getVolunteer;

    Volunteer.findOne({

        email: email

    })
        .then((volunteer) => {

            if (!volunteer) {

                res.status(401).json({

                    message: "Authentication Failed !"

                })

            }

            getVolunteer = volunteer;

            return bcrypt.compare(password, volunteer.password);

        })
        .then(async (response) => {

            if (!response) {

                res.status(412).json({

                    message: "Authentication Failed !"

                })

            } else {

                let jwtToken = jwt.sign({

                    email: getVolunteer.email,
                    password: getVolunteer.password

                } , process.env.JWT_SECRET , {

                    expiresIn: "1h"

                })

                res.cookie("token" , jwtToken , {

                    httpOnly: true

                })

                const role = await Role.findById(getVolunteer.role_id);

                return res.status(200).json({accessToken: jwtToken , volunteerId: getVolunteer._id , roleName: role.role_name , group: getVolunteer.group })

            }

        })
        .catch((err) => {

            return res.status(401).json({

                message: err.message ,
                success: false

            })

        })

});

export const logout = asyncHandler( async(req, res , next) => {
    
    req.headers.authorization = null;

    res.clearCookie("token");

    res.status(200).json({

        success:true,
        message: "Volunteer Loged Out Successfuly !",
        data:{}

    });

})

export const volunteerProfile = asyncHandler( async(req , res , next) => {

    const { id:_id } = req.params;

    try {
        
        const verifyVolunteer = await Volunteer.findOne({_id: _id});

        if (!verifyVolunteer) {

            res.status(403).json({

                message: "Volunteer not found !",
                success: false

            })

        } else {

            res.status(201).json({

                message: `volunteer: ${verifyVolunteer.name}`,
                success: true

            })

        }

    } catch (error) {

        res.status(401).json({

            success: false,
            message: error.message

        })

    }

})

export const volunteers = asyncHandler( async(req , res) => {

    try {
        
        const volunteers = await Volunteer.find();

        console.log(volunteers);

        res.status(200).json({

            data: volunteers,
            message: "Found volunteers successfuly !",
            success: true

        })

    } catch (error) {

        res.status(401).json({

            message: error.message,
            success: false

        })

    }

})

export const deleteVolunteer = async (req , res) => {

    const { id: _id } = req.params.id;

    try {

        const deletedVolunteer = await Volunteer.deleteOne(_id);
        console.log(deletedVolunteer);
        res.status(201).json({ message: "Volunteer Has been deleted successfuly !" });
        
    } catch (error) {
        
        throw new Error(error);

    }

}

export const updateVolunteer = async (req , res) => {

    const { id: _id } = req.params;

    let newPost = req.body;

    newPost.password = await bcrypt.hash(req.body.password , 10);

    try {
        
        const post = await Volunteer.updateOne({_id: new mongoose.Types.ObjectId(_id)} , newPost);

        res.status(201).json(post);

    } catch (error) {
        
        console.log(error);

    }

}