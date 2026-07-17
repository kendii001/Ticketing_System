import Pending from "../models/Pending.js";

// Events
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Pending.getPendingEvents();
    res.json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch pending events." });
  }
};

export const approveEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Pending.approveEvent(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to approve event." });
  }
};

export const rejectEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Pending.rejectEvent(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }
    res.json({ success: true, event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to reject event." });
  }
};

// Organizers
export const getPendingOrganizers = async (req, res) => {
  try {
    const organizers = await Pending.getPendingOrganizers();
    res.json({ success: true, organizers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch pending organizers." });
  }
};

export const approveOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    const organizer = await Pending.approveOrganizer(id);
    if (!organizer) {
      return res.status(404).json({ success: false, message: "Organizer not found." });
    }
    res.json({ success: true, organizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to approve organizer." });
  }
};

export const rejectOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    const organizer = await Pending.rejectOrganizer(id);
    if (!organizer) {
      return res.status(404).json({ success: false, message: "Organizer not found." });
    }
    res.json({ success: true, organizer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to reject organizer." });
  }
};