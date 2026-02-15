const {
  createUser,
  getUserById,
  loginUser,
} = require("../service/user.service");

async function handleCreateUser(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function handleGetUser(req, res, next) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function handleLogin(req, res, next) {
  try {
    const { email } = req.body;

    const result = await loginUser(email);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  handleCreateUser,
  handleGetUser,
  handleLogin,
};
