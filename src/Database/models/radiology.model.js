import mongoose from "mongoose";

const radiologySchema = new mongoose.Schema(
  {
    radiology_type: {
      type: String,
      enum: ["X-Ray", "MRI", "CT Scan", "Ultrasound"],
      required: true,
    },
    radiologistNotes: {
      type: String,
      required: true,
    },
    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],
    radiology_date: {
      type: Date,
      default: Date.now,
    },
    citizenNid: {
      type: mongoose.Schema.Types.String, // Reference to Citizen model using Nid
      ref: "Citizen",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create model
const Radiology = mongoose.model("Radiology", radiologySchema);
export default Radiology;
