// app/api/service-enquiries/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ServiceEnquiry from "@/models/ServiceEnquiry";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const enquiries = await ServiceEnquiry.find({}).sort({ submittedAt: -1 });
  return NextResponse.json(enquiries);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const enquiry = new ServiceEnquiry(data);
  await enquiry.save();
  return NextResponse.json(enquiry, { status: 201 });
}