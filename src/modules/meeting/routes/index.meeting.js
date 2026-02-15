const express = require("express");
const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middlewares");

const {
  handleCreateMeeting,
  handleListMeetings,
  handleGetMeeting,
  handleUpdateMeeting,
  handleDeleteMeeting,
} = require("../interface/meeting.controller");

// All Safety Routes
router.use(authMiddleware);

router.post("/", handleCreateMeeting);
router.get("/", handleListMeetings);
router.get("/:id", handleGetMeeting);
router.put("/:id", handleUpdateMeeting);
router.delete("/:id", handleDeleteMeeting);

module.exports = router;
