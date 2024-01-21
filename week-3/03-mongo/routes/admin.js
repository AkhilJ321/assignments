const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  await Admin.create({ username, password });
  res.status(201).json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  let { id, title, description, price, imageLink, published } = req.body;
  price = parseInt(price);
  const course = new Course({
    id,
    title,
    description,
    price,
    imageLink,
    published,
  });
  await Course.create(course);
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: course.id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
