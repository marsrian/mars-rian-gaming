"use client";
import Left from "@/components/Icons/Left";
import BlogForm from "@/components/layout/BlogForm";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import DeleteButton from "@/components/layout/DeleteButton";
import { quantico } from "@/utils/fonts";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const [blogItem, setBlogItem] = useState(null);
  const [redirectItems, setRedirectItems] = useState(false);

  useEffect(() => {
    fetch("/api/blogs").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setBlogItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/blogs", {
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
      loading: "Updating blog...",
      success: "UPdated!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  // DELETE GAME DATA:
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/blogs?_id=" + id, {
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
    return redirect("/dashboard/blogs");
  }

  return (
    <section className="mt-8 px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link className={`${quantico.className} button border border-gray-600 rounded-md p-2`} href={"/dashboard/blogs"}>
          <Left /> Show all Blogs
        </Link>
      </div>
      <BlogForm blogItem={blogItem} onSubmit={handleFormSubmit} />
      <div className={`${quantico.className} my-4 bg-orange-800 text-white rounded-xl`}>
        <DeleteButton
          label="Delete this blog item"
          onDelete={handleDeleteClick}
          className={`${quantico.className}`}
        />
      </div>
    </section>
  );
};

export default EditBlogPage;
