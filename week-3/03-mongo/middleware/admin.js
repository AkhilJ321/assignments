const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  if (!username || !password) {
    res.status(400).json({ message: "Username or password not provided" });
  }
  try {
    const admin = Admin.findOne({ username, password });
    if (!admin) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid credentials" });
  }
}

module.exports = adminMiddleware;
