// import { Schema, model, models } from "mongoose";
const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const DoctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["lahore", "islamabad", "karachi"],
  },
  image: {
    type: String,
    default: "https://imgur.com/HntPtXj",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

DoctorSchema.pre("save", function (next) {
  const SALT_WORK_FACTOR = 10;
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
DoctorSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

DoctorSchema.methods.generateJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.SECRETE_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const Doctor = models.Doctor || model("Doctor", DoctorSchema);

// export default Doctor;
module.exports = Doctor;
