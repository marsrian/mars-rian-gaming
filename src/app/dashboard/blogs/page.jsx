"use client";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import useProfile from "@/components/layout/useProfile";
import { Quantico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const quantico = Quantico({
  weight: ["400"],
  subsets: ["latin"],
});

const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/blogs").then((res) => {
      res.json().then((blogItems) => {
        setBlogItems(blogItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading Blog post...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <DashBoardTabs isAdmin={true} />
      <div className={`${quantico.className} mt-8`}>
        <Link className="button" href={"/dashboard/blogs/new"}>
          Create new Blog
        </Link>
      </div>
      <div className={`${quantico.className}`}>
        <h2 className="text-sm text-gray-500 mt-8">Edit game item:</h2>
        <div className="grid grid-cols-1 gap-2">
          {blogItems.length > 0 &&
            blogItems.map((item) => (
              <div
                key={item._id}
                className="border border-gray-500 rounded-md p-2"
              >
                <Link href={"/dashboard/blogs/edit/" + item._id} className="text-blue-500 hover:text-blue-700">
                {item.title}
                </Link>
                <div className="flex justify-between">
                  <p>Category: {item.category}</p>
                  <p>Date: {item.createdAt}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
