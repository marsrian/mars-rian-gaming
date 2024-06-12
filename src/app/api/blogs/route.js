import connectMongo from "@/libs/connectMongo";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  const data = await req.json();
  const blogDoc = await Blog.create(data);
  return NextResponse.json(blogDoc);
}

export async function GET() {
  await connectMongo();
  const blogs = await Blog.find();
  return NextResponse.json({ blogs });
}

export async function PUT(req) {
  await connectMongo();
  const { _id, ...data } = await req.json();
  await Blog.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await connectMongo();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Blog.deleteOne({ _id });
  return NextResponse.json(true);
}
