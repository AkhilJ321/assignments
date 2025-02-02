const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  if (!username || !password) {
    res.status(400).json({ message: "Username or password not provided" });
  }

  const user = User.findOne({ username, password });
  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
  }
  next();
}

module.exports = userMiddleware;
