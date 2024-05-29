import connectMongo from "@/libs/connectMongo";
import { Game } from "@/models/Game";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongo();
  const game = await Game.findOne({ _id: id });
  return NextResponse.json({ game }, { status: 200 });
}
