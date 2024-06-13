import { useEffect, useState } from "react";
import GameDescProps from "./GameDescProps";
import { quantico } from "@/utils/fonts";

const BlogForm = ({ onSubmit, blogItem }) => {
  const [title, setTitle] = useState(blogItem?.title || "");
  const [category, setCategory] = useState(blogItem?.category || "");
  const [video, setVideo] = useState(blogItem?.video || "");
  const [desc, setDesc] = useState(blogItem?.desc || "");

  useEffect(() => {
    if (blogItem) {
      setTitle(blogItem.title || "");
      setCategory(blogItem.category || "");
      setVideo(blogItem.video || "");
      setDesc(blogItem.desc || "");
    }
  }, [blogItem]);

  const categories = [
    { name: "Select" },
    { name: "Download" },
    { name: "PC Game" },
    { name: "Game Info" },
  ];

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          title,
          category,
          video,
          desc,
        })
      }
      className={`${quantico.className} mt-4`}
    >
      <div className="flex flex-col gap-1">
        <label className="text-white">Title</label>
        <input
          type="text"
          id=""
          name=""
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Game Name"
          className="p-2 border rounded mb-2"
        />
        <label className="text-white">Category</label>
        <select
          id=""
          name=""
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          className="border p-2 rounded mb-2"
        >
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <label className="text-white">Video</label>
        <input
          type="text"
          id=""
          name=""
          value={video}
          onChange={(ev) => setVideo(ev.target.value)}
          placeholder="Game Description"
          className="p-2 border rounded mb-2"
        />
        <label className="text-white">Add Description:</label>
        <GameDescProps
          name="Descriptions"
          props={desc}
          setProps={setDesc}
          addLabel={"Add Description"}
        />
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default BlogForm;
