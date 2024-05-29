import connectMongo from "@/libs/connectMongo";
import { Game } from "@/models/Game";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const game = await Game.findOne({ _id: id });
  return NextResponse.json({ game }, { status: 200 });
}
