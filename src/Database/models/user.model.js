import mongoose from "mongoose";
import { generateHash } from "../../utils/security/hash.security.js";
export const roles = {
    USER: "User",
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    SUPERADMIN:"SuperAdmin"
};

export const genders = {
    MALE: "Male",
    FEMALE: "Female",
};

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(roles),
            default: roles.USER,
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
// UserSchema.pre("save", function (next) {
//   if (this.isModified("password")) {
//     this.password = generateHash({ data: this.password });
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);
export default User;
