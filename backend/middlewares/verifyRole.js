import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Role from "../models/roleModel.js"
import Volunteer from "../models/volunteerModel.js"

dotenv.config();

export default (req , res , next) => {

    const token = req.headers.authorization.replace("Bearer " , "");

    console.log(token);

    if (!token) {

        res.status(401).json({message: "Authorization Failed"});

    }
    jwt.verify(token , process.env.JWT_SECRET , async (err, decoded) => {

        if (err) {

            return res.status(403).json({ message: 'Failed to authenticate token' });

        }

        req.volunteerData = decoded;

        console.log(req.volunteerData);

        const volunteer = await Volunteer.find({ email: req.volunteerData.email });

        console.log(volunteer);

        const role = await Role.findById(volunteer[0].role_id);

        console.log(role);

        console.log(role.role_name);

        if (role.role_name == "admin") {

            next();

        } else {

            res.status(403).json({ message: "You don't have the access to this route !" })

        }


    });

}