const express = require("express");
const router = express.Router();
const eventController = require("./eventController");

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/:id/participants", eventController.addParticipant);
router.delete(
  "/:id/participants/:participantId",
  eventController.removeParticipant
);

module.exports = router;
