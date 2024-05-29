import connectMongo from "@/libs/connectMongo";
import { Game } from "@/models/Game";
// import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const data = await req.json();
  const gamesDoc = await Game.create(data);
  // return Response.json(gamesDoc);
  return NextResponse.json(gamesDoc);
}

export async function GET() {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const games = await Game.find();
  // return Response.json(games);
  return NextResponse.json(games);
}

export async function PUT(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const { _id, ...data } = await req.json();
  await Game.findByIdAndUpdate(_id, data);
  // return Response.json(true);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  // mongoose.connect(process.env.MONGODB_URL);
  await connectMongo();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Game.deleteOne({ _id });
  // return Response.json(true);
  return NextResponse.json(true);
}
