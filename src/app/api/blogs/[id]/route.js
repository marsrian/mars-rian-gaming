import { Blog } from "@/models/Blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  mongoose.connect(process.env.MONGODB_URL);
  const blog = await Blog.findOne({ _id: id });
  return NextResponse.json({ blog }, { status: 200 });
}
