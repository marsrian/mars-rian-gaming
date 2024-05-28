import mongoose, { models, model, Schema } from "mongoose";

const VideosSchema = new Schema({
  serial: Number,
  videoLink: String,
});

const GameSchema = new Schema(
  {
    name: { type: "String" },
    image: { type: "String" },
    description: { type: "String" },
    category: { type: mongoose.Types.ObjectId },
    videos: { type: [VideosSchema] },
  },
  {
    timestamps: true,
  }
);

export const Game = models?.Game || model("Game", GameSchema);
