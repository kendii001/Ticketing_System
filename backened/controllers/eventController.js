import Event from "../models/EventModel.js";

export const createEvent = async (req, res) => {
  const { title, eventDate } = req.body;

  if (!title || !eventDate) {
    return res.status(400).json({
      success: false,
      message: "Title and date are required.",
    });
  }

  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll(req.query);

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event.",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.update(req.params.id, req.body);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update event.",
    });
  }
};

export const approveEvent = async (req, res) => {
  try {
    const event = await Event.updateStatus(req.params.id, "published");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to approve event.",
    });
  }
};

export const rejectEvent = async (req, res) => {
  try {
    const event = await Event.updateStatus(req.params.id, "rejected");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to reject event.",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.delete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    res.json({
      success: true,
      message: "Event deleted.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
};