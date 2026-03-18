import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ 1️⃣ Middleware
app.use(express.json());

// ✅ 2️⃣ CORS Configuration (support your frontend domains)
const allowedOrigins = [
  "https://philip-portfolio-rgbx.vercel.app", // ✅ your current live frontend
  "https://philip-portfolio-uequ.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked for this origin: " + origin));
      }
    },
    credentials: true,
  })
);

// Optional: Extra CORS safety headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ 3️⃣ Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env file");
  process.exit(1);
}

// ✅ 4️⃣ MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  });

// ✅ 5️⃣ Testimonial Schema - UPDATED with profession and country
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    profession: { type: String, default: "Student" }, // ✅ Changed from position to profession
    country: { type: String, default: "" }, // ✅ NEW: Added country field
    text: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

// ✅ 6️⃣ Routes
app.get("/", (req, res) => {
  res.send("🚀 API is running and connected to MongoDB!");
});

// Fetch all testimonials
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    console.error("Error fetching testimonials:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a new testimonial - UPDATED to accept profession and country
app.post("/api/testimonials", async (req, res) => {
  try {
    const { name, email, profession, country, text, image, rating } = req.body;

    // Basic validation
    if (!name || !email || !text) {
      return res.status(400).json({
        error: "Please provide name, email, and testimonial message.",
      });
    }

    const testimonial = new Testimonial({
      name,
      email,
      profession: profession || "Student", // ✅ Use profession instead of position
      country: country || "", // ✅ Add country field
      text,
      image,
      rating,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    console.error("Error saving testimonial:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ✅ 7️⃣ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
