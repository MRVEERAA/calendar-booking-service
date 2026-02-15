const express = require("express");
const router = express.Router();

const {
  handleCreateUser,
  handleGetUser,
  handleLogin,
} = require("../interface/user.controller");

router.post("/login", handleLogin);

// POST /users
router.post("/", handleCreateUser);

// GET /users/:id
router.get("/:id", handleGetUser);

module.exports = router;
