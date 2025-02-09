import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    treatment: {
      type: [String], 
      required: true,
    },
    diagnosis: {
      type: [String], 
      required: true,
    },
    record_date: {
      type: Date,
      default: Date.now,
    },
    citizenNid: {
      type: mongoose.Schema.Types.String, // Nid is a string
      ref: "Citizen", // Reference to Citizen model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create model
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
