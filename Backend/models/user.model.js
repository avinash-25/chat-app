import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (this.isModified("passwordHash")) {
    const bcrypt = await import("bcrypt");
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const bcrypt = await import("bcrypt");
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export default User;
