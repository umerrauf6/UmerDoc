import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import Appointment from "@/models/appointmentModel";
import axios from "axios";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectDB();
    const { appointmentDateTime, doctorId } = await req.json();
    const newAppointment = new Appointment({
      doctorId,
      appointmentDate: appointmentDateTime,
    });
    const response = await newAppointment.save();

    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
