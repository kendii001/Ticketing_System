import express from "express";
import {
  getDashboardStats,
  getPendingOrganizers,
  approveOrganizer,
  rejectOrganizer,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getRecentPayments,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/admin/stats", getDashboardStats);
router.get("/admin/organizers/pending", getPendingOrganizers);
router.patch("/admin/organizers/:id/approve", approveOrganizer);
router.patch("/admin/organizers/:id/reject", rejectOrganizer);
router.get("/admin/events/pending", getPendingEvents);
router.patch("/admin/events/:id/approve", approveEvent);
router.patch("/admin/events/:id/reject", rejectEvent);
router.get("/admin/payments/recent", getRecentPayments);

export default router;