import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URL);
    const { name } = await req.json();
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  }

export async function GET() {
    mongoose.connect(process.env.MONGODB_URL);
    const categories = await Category.find();
    return Response.json(categories);
  }

  export async function DELETE(req) {
    await mongoose.connect(process.env.MONGODB_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({ _id });
    return Response.json(true);
  }

  export async function PUT(req) {
    mongoose.connect(process.env.MONGODB_URL);
    const { _id, name } = await req.json();
    await Category.updateOne({_id}, { name });
    return Response.json(true);
  }
