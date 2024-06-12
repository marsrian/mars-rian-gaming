import connectMongo from "@/libs/connectMongo";
import { Game } from "@/models/Game";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectMongo();
  const data = await req.json();
  const gamesDoc = await Game.create(data);
  return NextResponse.json(gamesDoc);
}

export async function GET() {
  await connectMongo();
  const games = await Game.find();
  return NextResponse.json({games});
}

// export async function GET(req) {
//   await connectMongo();

//   const url = new URL(req.url);
//   const page = parseInt(url.searchParams.get("page")) || 1;
//   const limit = parseInt(url.searchParams.get("limit")) || 3;
//   const skip = (page - 1) * limit;

//   const games = await Game.find().skip(skip).limit(limit);
//   const total = await Game.countDocuments();
  
//   return NextResponse.json({ games, total });
// }

export async function PUT(req) {
  await connectMongo();
  const { _id, ...data } = await req.json();
  await Game.findByIdAndUpdate(_id, data);
  return NextResponse.json(true);
}

export async function DELETE(req) {
  await connectMongo();
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await Game.deleteOne({ _id });
  return NextResponse.json(true);
}
