const contactModel = require("../models/contactModel");

const createContact = async (req, res) => {
    try {
        const { fullName, email, message } = req.body;

        if (!fullName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const contact = await contactModel.createContact(
            fullName,
            email,
            message
        );

        res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: contact,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await contactModel.getAllContacts();

        res.json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

const getContact = async (req, res) => {
    try {
        const contact = await contactModel.getContactById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        res.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

const markRead = async (req, res) => {
    try {
        const contact = await contactModel.markAsRead(req.params.id);

        res.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error.",
        });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContact,
    markRead,
};