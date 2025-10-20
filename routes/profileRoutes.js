import express from "express";
import Profile from "../models/Profile.js";

const router = express.Router();

// --- SINGLE PROFILE MANAGEMENT ROUTES ---

// ✅ GET /: Fetch the single existing profile
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found. Please create one." });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching profile." });
  }
});

// ✅ POST /: Create the single profile resource (if it doesn't exist)
router.post("/", async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(409).json({ message: "Profile already exists. Use PUT to update." });
    }

    const { name, title, about, skills, projects, social } = req.body;

    if (!name || !about) {
      return res.status(400).json({ message: "Missing required fields: name and about." });
    }

    const newProfile = new Profile({
      name,
      title,
      about,
      skills,
      projects,
      social,
    });

    const saved = await newProfile.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error during profile creation." });
  }
});

// 🚀 UPDATED: PUT /: Update the single existing profile (Preserve social links)
router.put("/", async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found. Cannot update non-existent profile." });
    }

    // ✅ Merge old data with new data
    const updateData = {
      ...existingProfile.toObject(),
      ...req.body,
      // ✅ Preserve social links if not sent from frontend
      social: req.body.social || existingProfile.social,
    };

    const updatedProfile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error while updating profile." });
  }
});

// 🚀 DELETE /: Delete the single existing profile
router.delete("/", async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({});

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found. Nothing to delete." });
    }

    res.status(200).json({ message: "Profile successfully deleted", deletedId: deletedProfile._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting profile." });
  }
});

export default router;
