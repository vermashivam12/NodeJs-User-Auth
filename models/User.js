const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: [true, "Please enter name."],
      minlength: [2, "Name must be minimum 2 characters long."],
      maxlength: [50, "Name must be maximum 25 characters long."],
    },

    contact: {
      trim: true,
      type: String,
      required: [true, "Please enter number."],
      minlength: [10, "Number must be 10 digits long."],
      maxlength: [10, "Number must be 10 digits long."],
    },

    gender: {
      trim: true,
      type: String,
      enum: ["male", "female", "bigender"],
      required: [true, "Please select your gender."],
    },

    address: {
      trim: true,
      type: String,
      required: [true, "Please enter your address."],
      minlength: [5, "Address must be minimum 5 characters long."],
      maxlength: [500, "Address must be maximum 500 characters long."],
    },

    country: {
      trim: true,
      type: String,
      required: [true, "Please enter your country."],
      minlength: [4, "Country must be minimum 4 characters long."],
      maxlength: [56, "Country must be maximum 56 characters long."],
    },

    slug: {
      trim: true,
      type: String,
      required: [true, "Please provide unique slug."],
    },

    email: {
      trim: true,
      type: String,
      required: [true, "Please enter Email Address."],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email address.",
      ],
    },

    password: {
      trim: true,
      type: String,
      required: [true, "Please enter password."],
      minlength: [6, "Password must be minimum 6 characters long."],
      maxlength: [15, "Password must be maximum 15 characters long."],
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.getUser = async function () {
  return this;
};

UserSchema.methods.validatePassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  let signObj = { id: this._id, email: this.email };
  return JWT.sign(signObj, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.statics.userExists = function (email) {
  return this.countDocuments({ email: email });
};

module.exports = mongoose.model("User", UserSchema);
