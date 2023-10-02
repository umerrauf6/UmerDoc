import connectDB from "@/lib/mongo";
import Doctor from "@/models/DoctorModel";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const data = await Doctor.find();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
