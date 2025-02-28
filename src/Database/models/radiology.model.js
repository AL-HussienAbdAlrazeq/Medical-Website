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
    national_ID: { type: String, required: true, ref: "Citizen" }, 
    // citizen_id: {
    //   type: mongoose.Schema.Types.ObjectId, // Reference to Citizen model using Nid
    //   ref: "Citizen",
    //   required: true,
    // },
  },
  {
    timestamps: { createdAt: "radiology_date", updatedAt: "modified_on" },// Adds createdAt and updatedAt fields
  }
);

// Create model
const Radiology = mongoose.model("Radiology", radiologySchema);
export default Radiology;
