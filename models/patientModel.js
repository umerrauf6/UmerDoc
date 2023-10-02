import { Schema, model, models } from "mongoose";
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const jose = require("jose");

const PatientSchema = new Schema({
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
  role: {
    type: String,
    enum: ["patient", "doctor"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PatientSchema.pre("save", function (next) {
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
PatientSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

PatientSchema.methods.generateJWT = async function () {
  const secret = new TextEncoder().encode(process.env.SECRETE_KEY);
  const alg = "HS256";
  const jwt = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuer(process.env.jwt_issuer)
    .setAudience(process.env.jwt_audience)
    .setExpirationTime(process.env.EXPIRES_IN)
    .sign(secret);
  return jwt;
};

const Patient = models.Patient || model("Patient", PatientSchema);

export default Patient;
