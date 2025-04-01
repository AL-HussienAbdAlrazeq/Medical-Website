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
    clinic_name: {
      type: String,
      required: true,
      trim: true,
    },
    clinic_code: {
      type: Number,
      required: true
    },
    national_ID: { type: String, required: true, ref: "Citizen" }, 
    // citizen_id: {
    //   type: mongoose.Schema.Types.ObjectId, // National_ID is a string
    //   ref: "Citizen", // Reference to Citizen model
    //   required: true,
    // },
  },
  {
    timestamps: { createdAt: "recode_date", updatedAt: "modified_on" },// Adds createdAt and updatedAt fields
    versionKey:false
  }
);

// Create model
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
