import express from "express"
import {getEvents,createEvent,updateEvent,deleteEvent} from "../controllers/eventController.js"
import verifyRole from "../middlewares/verifyRole.js"

const router = express.Router();
router.post('/create' , verifyRole , createEvent)
router.get('/get' , getEvents)
router.put('/update/:id' , verifyRole , updateEvent)
router.delete('/remove/:id' , verifyRole , deleteEvent )

export default router;