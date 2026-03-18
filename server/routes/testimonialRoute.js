import express from "express";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new testimonial
router.post("/", async (req, res) => {
  try {
    const { name, position, text, image, rating } = req.body;
    const testimonial = new Testimonial({
      name,
      position,
      text,
      image,
      rating,
    });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

export default router;
