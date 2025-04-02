const express = require("express");
const Profile = require("../models/profiles");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Import User model

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// ✅ Get all profiles (Public)
router.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Create a new profile (Authenticated users only)
router.post("/profiles", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    const newProfile = new Profile({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      image: imageUrl,
      user: req.user.userId,
    });

    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Get a single profile by ID (Public)
router.get("/profiles/get/:id", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile Not Found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Update a profile (Only owner can update)
router.put("/profiles/update/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile Not Found" });

    if (profile.user.toString() !== req.user.userId)
      return res.status(403).json({ error: "Unauthorized" });

    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Delete a profile (Only owner can delete)
router.delete("/profiles/delete/:id", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile Not Found" });

    if (profile.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized: You cannot delete this profile" });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profile Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});


// ✅ Register User
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Protected Route Example (User Profile)
router.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
