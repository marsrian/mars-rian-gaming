import mongoose, { models, model, Schema } from "mongoose";

const DescSchema = new Schema({
  description: String,
  imageLink: String,
});

const BlogSchema = new Schema(
  {
    title: { type: "String" },
    category: { type: "String" },
    video: { type: "String" },
    desc: { type: [DescSchema] },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = models?.Blog || model("Blog", BlogSchema);
