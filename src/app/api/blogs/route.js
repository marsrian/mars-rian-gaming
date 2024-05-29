import connectMongo from "@/libs/connectMongo";
import { Blog } from "@/models/Blog";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const data = await req.json();
  const blogDoc = await Blog.create(data);
  // return Response.json(blogDoc);
  return NextResponse.json(blogDoc);
}

export async function GET() {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const blogs = await Blog.find();
  return Response.json(blogs);
}

export async function PUT(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const { _id, ...data } = await req.json();
  await Blog.findByIdAndUpdate(_id, data);
  // return Response.json(true);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Blog.deleteOne({ _id });
  // return Response.json(true);
  return NextResponse.json(true);
}
