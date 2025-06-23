import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default (req , res , next) => {

    console.log("hello from verifyToken");

    const token = req.headers.authorization.replace("Bearer " , "");

    if (!token) {

        res.status(401).json({message: "Authorization Failed"});

    }
    console.log(token);
    jwt.verify(token , process.env.JWT_SECRET , (err, decoded) => {

        if (err) {

            return res.status(403).json({ message: 'Failed to authenticate token' });

        }

        req.volunteerData = decoded;

        next();

    });

}