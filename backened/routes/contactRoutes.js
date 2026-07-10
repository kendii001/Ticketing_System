import express from "express";
const router = express.Router();

const {
    createContact,
    getContacts,
    getContact,
    markRead,
} = require("../controllers/contactController");

router.post("/", createContact);

router.get("/", getContacts);

router.get("/:id", getContact);

router.put("/:id/read", markRead);
export default router;
