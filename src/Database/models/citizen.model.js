import mongoose from "mongoose";
import { generateHash } from "../../utils/security/hash.security.js";
export const roles = {
  USER: "User",
  ADMIN: "Admin",
  DOCTOR: "Doctor",
};

export const genders = {
  MALE: "Male",
  FEMALE: "Female",
};

const citizenSchema = new mongoose.Schema(
  {
    national_ID: {
      type: String,
      required: [true, "National ID is required."],
      trim: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true
    },
    password: {
      type: String,
      // required: true,
    },
    address: 
      {
        type: String,
      },
    blood_type: {
      type: String,

    },
    birth_date: {
      type: Date,

    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      default: genders.MALE,
    },
    mobileNumber: {
      type: String,
    },
    confirmEmail: { type: Boolean, default: false },
    confirmEmailOTP: String,
    codeExpiry: { type: Date },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false

  }
);
// citizenSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     this.password = generateHash({ data: this.password });
//   }
//   next();
// });

const Citizen = mongoose.model("Citizen", citizenSchema);
export default Citizen;
