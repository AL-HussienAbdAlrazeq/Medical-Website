import mongoose from "mongoose";

const citizenSchema = new mongoose.Schema(
  {
    national_ID: {
      type: String,
      required: [true, "National ID is required."],
      unique: true,  // Ensures unique index on national_ID
      trim: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    blood_type: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Citizen = mongoose.model("Citizen", citizenSchema);
export default Citizen;
