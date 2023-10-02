import mongoose, { Schema, models } from "mongoose";

const appointmentSchema = new Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
});
const AppointmentModel =
  models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default AppointmentModel;
