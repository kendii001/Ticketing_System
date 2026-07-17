import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  markRead,
} from "../controllers/contactController.js";

const router = express.Router();

// Create a contact
router.post("/", createContact);

// Get all contacts
router.get("/", getContacts);

// Get a single contact by ID
router.get("/:id", getContact);

// Mark a contact as read
router.put("/:id/read", markRead);

export default router;