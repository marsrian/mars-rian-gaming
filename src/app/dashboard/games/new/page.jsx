"use client"
import Left from "@/components/Icons/Left";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import GameFormPage from "@/components/layout/GameFormPage";
import { quantico } from "@/utils/fonts";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NewGamePage = () => {
  const [redirectItems, setRedirectItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving game...",
      success: "Saved!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  if (redirectItems) {
    return redirect("/dashboard/games");
  }

  return (
    <section className="mt-8 px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl mx-auto">
        <Link className={`${quantico.className} button border border-white text-white rounded-md p-2`} href={"/dashboard/games"}>
          <Left /> Show all games
        </Link>
      </div>
      <GameFormPage gameItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewGamePage;
