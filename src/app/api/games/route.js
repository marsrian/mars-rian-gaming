import { Game } from "@/models/Game";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const data = await req.json();
  const gamesDoc = await Game.create(data);
  return Response.json(gamesDoc);
}

export async function GET() {
  mongoose.connect(process.env.MONGODB_URL);
  const games = await Game.find();
  return Response.json(games);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const { _id, ...data } = await req.json();
  await Game.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Game.deleteOne({ _id });
  return Response.json(true);
}
