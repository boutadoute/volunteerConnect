import express from "express";
import {register,volunteers, login , volunteerProfile , updateVolunteer, deleteVolunteer, logout } from "../controllers/volunteerController.js"
import {registerValidation,loginValidation} from "../middlewares/authValidator.js"
import verifyRole from "../middlewares/verifyRole.js"
import verifyToken from "../middlewares/authJwt.js"

const router = express.Router();

// registre route with registre validation
router.post("/register", registerValidation,register);

// log in of user
router.post("/login", loginValidation, login);

// get volunteer profile by using his id 
router.get("/profile/:id" ,verifyToken,volunteerProfile);

// we use that route to get all volunteers inf
router.get("/volunteers", verifyToken,volunteers);

// adding a middlewares for verifying role
router.put("/vol/update/:id" ,  verifyRole,updateVolunteer)

router.delete("/vol/delete/:id" , verifyRole, deleteVolunteer)

// log out router
router.delete('/logout', verifyToken,logout)


export default router;