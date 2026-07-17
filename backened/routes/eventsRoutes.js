import express from "express";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

router.post("/events", eventController.createEvent);
router.get("/events", eventController.getEvents);
router.get("/events/:id", eventController.getEventById);
router.put("/events/:id", eventController.updateEvent);
router.patch("/events/:id/approve", eventController.approveEvent);
router.patch("/events/:id/reject", eventController.rejectEvent);
router.delete("/events/:id", eventController.deleteEvent);

export default router;