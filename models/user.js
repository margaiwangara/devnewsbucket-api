const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      maxlength: [255, "You have exceeded the maximum name length[255]"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email field is required"],
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        "Please enter a valid email"
      ],
      maxlength: [100, "You have exceeded the maximum email length[100]"]
    },
    password: {
      type: String,
      minlength: [6, "Password length should be at least 6 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Please enter a valid password, at least one lowercase and uppercase letter and one number"
      ],
      select: false,
      required: [true, "Password field is required"]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: [true, "Role field is required"]
    },
    profileImage: {
      type: String,
      default: "no-image.jpg",
      maxlength: [255, "You have exceeded the image name length[255]"]
    },
    resetPasswordToken: String,
    passwordTokenExpire: Date,
    confirmEmailToken: String,
    isEmailConfirmed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// hash password before storing data
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// check if passwords match
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

// Password Reset Token
userSchema.methods.generatePasswordResetToken = function(next) {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes expire

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
