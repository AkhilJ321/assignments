const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  const user = new User({ username, password });
  await User.create(user);
  res.status(201).json({ message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params;

  Course.findOne({ id: courseId }, (err, course) => {
    if (err || !course) {
      res.status(400).json({ message: "Invalid course id" });
    } else {
      User.updateOne(
        { username: req.headers.username },
        { $push: { courses: course } },
        (err) => {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(200).json({ message: "Course purchased successfully" });
          }
        }
      );
    }
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  User.findOne({ username: req.headers.username }, (err, user) => {
    if (err || !user) {
      res.status(400).json({ message: "Invalid username" });
    } else {
      res.status(200).json({ courses: user.courses });
    }
  });
});

module.exports = router;
