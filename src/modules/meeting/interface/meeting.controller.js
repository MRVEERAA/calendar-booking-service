const {
  createMeeting,
  listMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} = require("../service/meeting.service");

async function handleCreateMeeting(req, res, next) {
  try {
    const meeting = await createMeeting(req.body);
    res.status(201).json({ success: true, data: meeting });
  } catch (err) {
    next(err);
  }
}

async function handleListMeetings(req, res, next) {
  try {
    const meetings = await listMeetings(req.query);
    res.status(200).json({ success: true, data: meetings });
  } catch (err) {
    next(err);
  }
}

async function handleGetMeeting(req, res, next) {
  try {
    const meeting = await getMeetingById(req.params.id);
    if (!meeting)
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    res.status(200).json({ success: true, data: meeting });
  } catch (err) {
    next(err);
  }
}

async function handleUpdateMeeting(req, res, next) {
  try {
    const meeting = await updateMeeting(req.params.id, req.body);
    if (!meeting)
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    res.status(200).json({ success: true, data: meeting });
  } catch (err) {
    next(err);
  }
}

async function handleDeleteMeeting(req, res, next) {
  try {
    const deleted = await deleteMeeting(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    res.status(204).json({
      status: true,
      message: "Meeting Deleted Succesfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleCreateMeeting,
  handleListMeetings,
  handleGetMeeting,
  handleUpdateMeeting,
  handleDeleteMeeting,
};
