import connectDB from "@/lib/mongo";
import Appointment from "@/models/appointmentModel";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const userId = req.headers.get("userId");
    const data = await Appointment.find({ doctorId: userId });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
