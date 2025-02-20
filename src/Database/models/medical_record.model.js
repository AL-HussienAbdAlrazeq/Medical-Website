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
    clinic_name:{
      type:String,
      required:true,
      trim:true,
      unique:true
    },
    clinic_code:{
      type:Number,
      required:true
    },
    citizenNid: {
      type: mongoose.Schema.Types.String, // National_ID is a string
      ref: "Citizen", // Reference to Citizen model
      required: true,
    },
    citizen_id: {
      type: mongoose.Schema.Types.ObjectId, // National_ID is a string
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
