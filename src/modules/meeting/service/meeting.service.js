const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

// Conflits Check
async function hasConflict({ userId, startTime, endTime, excludeId }) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

// Create a new meeting

async function createMeeting(data) {
  const { userId, startTime, endTime } = data;

  if (!userId) {
    const err = new Error("userId is required");
    err.status = 400;
    throw err;
  }

  if (new Date(startTime) >= new Date(endTime)) {
    const err = new Error("startTime must be before endTime");
    err.status = 400;
    throw err;
  }

  const conflict = await hasConflict({ userId, startTime, endTime });
  if (conflict) {
    const err = new Error("Time slot already booked");
    err.status = 400;
    throw err;
  }

  return Meeting.create(data);
}

// List meetings with optional filters

async function listMeetings({ userId, startDate, endDate }) {
  const where = {};
  if (userId) where.userId = userId;
  if (startDate) where.startTime = { [Op.gte]: new Date(startDate) };
  if (endDate)
    where.endTime = { ...(where.endTime || {}), [Op.lte]: new Date(endDate) };

  return Meeting.findAll({ where, order: [["startTime", "ASC"]] });
}

// Get meeting by ID

async function getMeetingById(id) {
  return Meeting.findByPk(id);
}

// Update meeting

async function updateMeeting(id, data) {
  const meeting = await getMeetingById(id);
  if (!meeting) return null;

  const { startTime, endTime, title } = data;

  if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
    const err = new Error("startTime must be before endTime");
    err.status = 400;
    throw err;
  }

  const conflict = await hasConflict({
    userId: meeting.userId,
    startTime: startTime || meeting.startTime,
    endTime: endTime || meeting.endTime,
    excludeId: id,
  });

  if (conflict) {
    const err = new Error("Time slot already booked");
    err.status = 400;
    throw err;
  }

  meeting.title = title ?? meeting.title;
  meeting.startTime = startTime ?? meeting.startTime;
  meeting.endTime = endTime ?? meeting.endTime;

  await meeting.save();
  return meeting;
}

// Delete meeting

async function deleteMeeting(id) {
  const meeting = await getMeetingById(id);
  if (!meeting) return null;
  await meeting.destroy();

  return true;
}

module.exports = {
  createMeeting,
  listMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
