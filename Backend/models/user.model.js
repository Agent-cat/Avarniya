import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
   
    collegeId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    
    registeredEvents: {
      type: [String],
      default: [],
    },
   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
