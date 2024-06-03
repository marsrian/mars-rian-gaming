"use client";
import Right from "@/components/Icons/Right";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import useProfile from "@/components/layout/useProfile";
import { quantico } from "@/utils/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";

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

  // Utility function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <section className="mt-8 mx-auto px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className={`${quantico.className} mt-8 max-w-2xl mx-auto`}>
        <Link
          className="button border border-white text-white rounded-md p-2"
          href={"/dashboard/blogs/new"}
        >
          Create new Blog <Right />
        </Link>
      </div>
      <div className={`${quantico.className}`}>
        <h2 className="text-sm text-gray-500 mt-8">Edit blog item:</h2>
        <div className="grid grid-cols-1 gap-2">
          {blogItems.length > 0 &&
            blogItems.map((item) => (
              <div
                key={item._id}
                className="border border-gray-500 rounded-md p-2"
              >
                <Link
                  href={"/dashboard/blogs/edit/" + item._id}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {item.title}
                </Link>
                <div className="flex justify-between mt-1 text-gray-400">
                  <p className="flex items-center gap-1">
                    <FaRegListAlt /> {item.category}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaRegCalendarAlt /> {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
