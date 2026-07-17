import express from "express";
import {
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getPendingOrganizers,
  approveOrganizer,
  rejectOrganizer,
} from "../controllers/pendingController.js";

const router = express.Router();

router.get("/pending/events", getPendingEvents);
router.patch("/pending/events/:id/approve", approveEvent);
router.patch("/pending/events/:id/reject", rejectEvent);

router.get("/pending/organizers", getPendingOrganizers);
router.patch("/pending/organizers/:id/approve", approveOrganizer);
router.patch("/pending/organizers/:id/reject", rejectOrganizer);

export default router;