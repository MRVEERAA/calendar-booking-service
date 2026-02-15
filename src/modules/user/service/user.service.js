const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// Create user
async function createUser(data) {
  return User.create(data);
}

// Get user by ID
async function getUserById(id) {
  return User.findByPk(id);
}

// 🔐 Login user (generate JWT)
async function loginUser(email) {
  if (!email) {
    const err = new Error("Email is required");
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  // Generate token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return { user, token };
}

module.exports = {
  createUser,
  getUserById,
  loginUser,
};
