const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Cloudinary URL
  address: { type: String, required: true },
  location: { lat: Number, lng: Number }, // Latitude & Longitude
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
