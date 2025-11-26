const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["guest", "student", "lecturer", "security", "admin"],
      default: "student",
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);
