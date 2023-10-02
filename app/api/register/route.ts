import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import Patient from "../../../models/patientModel";
import Doctor from "../../../models/DoctorModel";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectDB();

    const {
      name,
      email,
      phoneNumber,
      password,
      description,
      city,
      role,
    }: Partial<PatientData> = await req.json();

    if (
      !name ||
      !email ||
      !phoneNumber ||
      !password ||
      !description ||
      !city ||
      !role
    ) {
      return NextResponse.json(
        { message: "fill all the details" },
        { status: 400 }
      );
    }
    if (role.toLowerCase() === "patient") {
      const oldPatient = await Patient.findOne({ email: email });
      if (oldPatient)
        return NextResponse.json(
          { message: "email already exist" },
          { status: 304 }
        );
      const newPatient = new Patient({
        name,
        email,
        phoneNumber: parseInt(phoneNumber),
        password,
        description,
        city: city.toLowerCase(),
        role: role.toLowerCase(),
      });

      const response = await newPatient.save();

      return NextResponse.json({ message: response }, { status: 200 });
    } else {
      const oldDoctor = await Doctor.findOne({ email: email });
      if (oldDoctor)
        return NextResponse.json(
          { message: "email already exist" },
          { status: 304 }
        );
      const newDoctor = new Doctor({
        name,
        email,
        phoneNumber: parseInt(phoneNumber),
        password,
        description,
        city: city.toLowerCase(),
        role: role.toLowerCase(),
      });

      const response = await newDoctor.save();

      return NextResponse.json({ message: response }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
