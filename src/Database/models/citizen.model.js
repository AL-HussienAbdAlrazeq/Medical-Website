import mongoose from "mongoose";



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
    gender: {
      type: String,
      enum: Object.values(genders),
      default: genders.MALE,
    },
    mobileNumber: {
      type: String,
    },
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
