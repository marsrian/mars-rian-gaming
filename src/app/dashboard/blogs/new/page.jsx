"use client"
import BlogForm from "@/components/layout/BlogForm";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NewBlogPage = () => {
  const [redirectItems, setRedirectItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/blogs", {
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
      loading: "Saving blog...",
      success: "Saved!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  if (redirectItems) {
    return redirect("/dashboard/blogs");
  }

  return (
    <section className="mt-8">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl mx-auto">
        <Link className="button" href={"/dashboard/blogs"}>
          Show all menu items
        </Link>
      </div>
      <BlogForm blogItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewBlogPage;
