import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  // CORE PROFILE FIELDS
  name: {
    type: String,
    required: true, // Enforce required field
  },
  title: String,
  about: {
    type: String,
    required: true, // Enforce required field
  },

  // ARRAY FIELDS
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],

  // ✅ NEW: SOCIAL LINKS OBJECT
  social: {
    linkedin: String,
    github: String,
    // Note: Since 'social' itself is not marked as 'required', 
    // it can be omitted, and its nested fields are optional.
  },
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;