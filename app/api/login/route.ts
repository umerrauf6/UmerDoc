import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import Patient from "../../../models/patientModel";
import Doctor from "@/models/DoctorModel";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    var patient, doctor;
    await connectDB();
    const { email, password }: Partial<PatientData> = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "fill all the details" },
        { status: 400 }
      );
    }
    patient = await Patient.findOne({ email });
    if (!patient) {
      doctor = await Doctor.findOne({ email });
      if (!doctor)
        return NextResponse.json(
          { message: "no email exist!" },
          { status: 400 }
        );
    }

    if (patient?.role === "patient" || doctor?.role === "patient") {
      var isMatch = await patient.validatePassword(password);
      if (!isMatch)
        return NextResponse.json(
          { message: "Password Wrong" },
          { status: 400 }
        );
      const token = await patient.generateJWT();

      return NextResponse.json(
        {
          user: {
            id: patient._id,
            email: patient.email,
            name: patient.name,
            description: patient.description,
            city: patient.city,
            phoneNumber: patient.phoneNumber,
            role: patient.role,
          },
          token,
        },
        {
          status: 201,
        }
      );
    }
    var isMatch = await doctor.validatePassword(password);
    if (!isMatch)
      return NextResponse.json({ message: "Password Wrong" }, { status: 400 });
    const token = await doctor.generateJWT();

    return NextResponse.json(
      {
        user: {
          id: doctor._id,
          email: doctor.email,
          name: doctor.name,
          description: doctor.description,
          city: doctor.city,
          phoneNumber: doctor.phoneNumber,
          role: "doctor",
        },
        token,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Error: error }, { status: 404 });
  }
}
