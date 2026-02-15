function validateMeeting(data) {
  const { userId, title, startTime, endTime } = data;

  if (!userId || !title || !startTime || !endTime) {
    throw { status: 400, message: "All fields are required" };
  }

  if (new Date(startTime) >= new Date(endTime)) {
    throw { status: 400, message: "startTime must be before endTime" };
  }
}

module.exports = { validateMeeting };
