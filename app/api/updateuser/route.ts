import connectDB from "@/lib/mongo";
import Doctor from "@/models/DoctorModel";
import Patient from "@/models/patientModel";
import { NextResponse } from "next/server";

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const userDetails: Partial<PatientData> = await req.json();
    const { createdBy, ...extractedData } = userDetails;
    var data = await Patient.updateOne(
      { _id: createdBy },
      { ...extractedData }
    );
    if (!data)
      data = await Doctor.updateOne({ _id: createdBy }, { ...extractedData });

    return NextResponse.json({ message: "hello" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Error: error }, { status: 404 });
  }
}
