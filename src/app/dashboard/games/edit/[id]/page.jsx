"use client";
import Left from "@/components/Icons/Left";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import DeleteButton from "@/components/layout/DeleteButton";
import GameFormPage from "@/components/layout/GameFormPage";
import { quantico } from "@/utils/fonts";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditGamePage = () => {
  const { id } = useParams();
  const [gameItem, setGameItem] = useState(null);
  const [redirectItems, setRedirectItems] = useState(false);

  useEffect(() => {
    fetch("/api/games").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setGameItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/games", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving item...",
      success: "Saved!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  // DELETE GAME DATA:
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/games?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting item...",
      success: "Deleted!",
      error: "Error deleting!",
    });

    setRedirectItems(true);
  }

  if (redirectItems) {
    return redirect("/dashboard/games");
  }

  return (
    <section className="mt-8 px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link className={`${quantico.className} button border border-gray-600 rounded-md p-2`} href={"/dashboard/games"}>
          <Left /> Show all games
        </Link>
      </div>
      <GameFormPage gameItem={gameItem} onSubmit={handleFormSubmit} />
      <div className={`${quantico.className} max-w-[562px] ml-auto my-4 bg-orange-800 text-white rounded-xl`}>
          <DeleteButton 
            label="Delete this game item"
            onDelete={handleDeleteClick}
           />
      </div>
    </section>
  );
};

export default EditGamePage;
