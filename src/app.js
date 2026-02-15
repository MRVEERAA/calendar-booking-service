const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

const { UserRoutes } = require("./modules/user/index"); // user module
const { MeetingRoutes } = require("./modules/meeting/index"); // meeting module

const app = express();

// Midleware
app.use(express.json());

// Mount routes
app.use("/users", UserRoutes);
app.use("/meetings", MeetingRoutes);

// Global error handlerfor all
app.use(errorHandler);

// Machine Chevk routel
app.get("/", (req, res) => {
  res.send("Calendar Booking Service API Running 🚀");
});

module.exports = app;
