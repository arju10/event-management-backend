const eventService = require("./eventService");

// Create a new event ==== API: ("/events") === Method :[ POST]
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json({
      success: true,
      message: "Event is created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Event is not created successfully",
    });
  }
};

// Get all events with pagination ==== API: ("/events?page=1&limit=10") === Method :[ GET]
exports.getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await eventService.getAllEvents(page, limit);
    res.json({
      success: true,
      message: "Events retrieved successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific event by ID ==== API: ("/events/:id") === Method :[ GET]
exports.getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({
      success: true,
      message: "Event retrieved successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing event ==== API: ("/events/:id") === Method :[ PUT]
exports.updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    res.json({
      success: true,
      message: "Event is updated successfully",
      event,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event ==== API: ("/events/:id") === Method :[ DELETE]
exports.deleteEvent = async (req, res) => {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    res.status(201).json({
      success: true,
      message: "Event is deleted successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a participant to an event ==== API: ("/events/:id/participants") === Method :[ POST]
exports.addParticipant = async (req, res) => {
  try {
    const participant = await eventService.addParticipant(
      req.params.id,
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Participant added successfully",
      data: participant,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a participant from an event ==== API: ("/events/:id/participants/:participantId") === Method :[ DELETE]
exports.removeParticipant = async (req, res) => {
  try {
    const participant = await eventService.removeParticipant(
      req.params.id,
      req.params.participantId
    );
    res.status(200).json({
      success: true,
      message: "Participant removed successfully",
      data: participant,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
