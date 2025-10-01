// app/api/testimonials/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find({});
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const data = await req.json();
  const testimonial = new Testimonial(data);
  await testimonial.save();
  return NextResponse.json(testimonial, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const data = await req.json();
  const testimonial = await Testimonial.findByIdAndUpdate(data._id, data, { new: true });
  return NextResponse.json(testimonial);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const { id } = await req.json();
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}