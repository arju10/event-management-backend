const { Op } = require("sequelize");
const { Event, Participant } = require("../models");

// Helper function to check for time conflicts
async function checkTimeConflict(event) {
  const conflictingEvents = await Event.findAll({
    where: {
      location: event.location,
      date: event.date,
      [Op.and]: [
        {
          startTime: {
            [Op.lt]: event.endTime,
          },
        },
        {
          endTime: {
            [Op.gt]: event.startTime,
          },
        },
      ],
    },
  });

  // Exclude the current event if it's an update
  if (event.id) {
    return conflictingEvents.some((e) => e.id !== event.id);
  }

  return conflictingEvents.length > 0;
}

// Create a new event ==== API: ("/events") === Method :[ POST]
async function createEvent(eventData) {
  const { startTime, endTime } = eventData;

  // Validate that endTime is after startTime
  if (
    new Date(`1970-01-01T${endTime}Z`) <= new Date(`1970-01-01T${startTime}Z`)
  ) {
    throw new Error("End time must be after start time");
  }

  // Check for conflicts before creating
  if (await checkTimeConflict(eventData)) {
    throw new Error("Time conflict with another event");
  }

  return Event.create(eventData);
}

// Get all events with pagination ==== API: ("/events?page=1&limit=10") === Method :[ GET]
async function getAllEvents(page = 1, limit = 10) {
  return Event.findAndCountAll({
    limit: parseInt(limit),
    offset: (page - 1) * limit,
    include: [Participant], // Include participants in the result
  });
}

// Get a specific event by ID ==== API: ("/events/:id") === Method :[ GET]
async function getEventById(id) {
  return Event.findByPk(id, { include: Participant });
}

// Update an existing event ==== API: ("/events/:id") === Method :[ PUT]
async function updateEvent(id, eventData) {
  const event = await Event.findByPk(id);
  if (!event) {
    throw new Error("Event not found");
  }

  // Store the original details
  const originalEvent = { ...event.dataValues };

  // Update the event
  await event.update(eventData);

  // Check for conflicts
  if (await checkTimeConflict(event)) {
    await event.update(originalEvent);
    throw new Error("Time conflict with another event");
  }

  return event;
}

// Delete an event ==== API: ("/events/:id") === Method :[ DELETE]
async function deleteEvent(id) {
  const event = await Event.findByPk(id);
  if (!event) {
    throw new Error("Event not found");
  }

  await event.destroy();
  return event;
}

// Add a participant to an event ==== API: ("/events/:id/participants") === Method :[ POST]
async function addParticipant(eventId, participantData) {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  const { email } = participantData;

  const conflictingParticipant = await Participant.findOne({
    where: {
      email,
      eventId: {
        [Op.ne]: eventId,
      },
    },
    include: {
      model: Event,
      where: {
        date: event.date,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [event.startTime, event.endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [event.startTime, event.endTime],
            },
          },
          {
            [Op.and]: [
              {
                startTime: {
                  [Op.lte]: event.startTime,
                },
              },
              {
                endTime: {
                  [Op.gte]: event.endTime,
                },
              },
            ],
          },
        ],
      },
    },
  });

  if (conflictingParticipant) {
    throw new Error(
      "Participant is already assigned to another event at the same time on this date."
    );
  }

  return Participant.create({
    ...participantData,
    eventId,
  });
}

// Remove a participant from an event ==== API: ("/events/:id/participants/:participantId") === Method :[ DELETE]
async function removeParticipant(eventId, participantId) {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw new Error("Event not found");
  }

  const participant = await Participant.findOne({
    where: {
      id: participantId,
      eventId: eventId,
    },
  });

  if (!participant) {
    throw new Error("Participant not found or not assigned to this event");
  }

  await participant.destroy();
  return participant;
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  addParticipant,
  removeParticipant,
};
