// routes/eventsRoutes.js
import express from "express";
import * as eventController from "../controllers/eventController.js";

const router = express.Router();

// 1. Specific sub-routes (MUST come before dynamic parameter routes like /:id)
router.get("/pending", eventController.getPendingEvents); // GET /api/events/pending

// 2. Collection routes
router.get("/", eventController.getEvents);               // GET /api/events
router.post("/", eventController.createEvent);             // POST /api/events

// 3. Dynamic parameter routes (/:id)
router.get("/:id", eventController.getEventById);          // GET /api/events/:id
router.put("/:id", eventController.updateEvent);            // PUT /api/events/:id
router.delete("/:id", eventController.deleteEvent);        // DELETE /api/events/:id

// 4. Specific action sub-routes on an ID
router.patch("/:id/approve", eventController.approveEvent); // PATCH /api/events/:id/approve
router.patch("/:id/reject", eventController.rejectEvent);   // PATCH /api/events/:id/reject

export default router;