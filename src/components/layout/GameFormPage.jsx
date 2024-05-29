"use client";
import { useEffect, useState } from "react";
import GameItemProps from "./GameItemProps";
import { quantico } from "@/utils/fonts";

const GameFormPage = ({ onSubmit, gameItem }) => {
  const [name, setName] = useState(gameItem?.name || "");
  const [image, setImage] = useState(gameItem?.image || "");
  const [description, setDescription] = useState(gameItem?.description || "");
  const [videos, setVideos] = useState(gameItem?.videos || "");
  const [category, setCategory] = useState(gameItem?.category || "");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (gameItem) {
      setName(gameItem.name || "");
      setImage(gameItem.image || "");
      setDescription(gameItem.description || "");
      setVideos(gameItem.videos || "");
      setCategory(gameItem.category || "");
    }
  }, [gameItem]);

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          name,
          image,
          description,
          category,
          videos,
        })
      }
      className={`${quantico.className} mt-4`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        <div className="flex flex-col gap-1">
          <label>Image</label>
          <input
            type="text"
            value={image}
            onChange={(ev) => setImage(ev.target.value)}
            placeholder="Image Link"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Game Name"
            className="p-2 border rounded mb-2"
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Game Description"
            className="p-2 border rounded mb-2"
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
            className="border p-2 rounded mb-2"
          >
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label>Add Video:</label>
          <GameItemProps
            name="Videos"
            props={videos}
            setProps={setVideos}
            addLabel={"Add video link"}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default GameFormPage;
