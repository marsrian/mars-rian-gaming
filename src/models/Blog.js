import { models, model, Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export const Blog = models?.Blog || model("Blog", BlogSchema);
