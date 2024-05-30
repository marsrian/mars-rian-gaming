"use client";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import useProfile from "@/components/layout/useProfile";
import { quantico } from "@/utils/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { data, loading } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user data...";
  }

  if (!data.admin) {
    return "You are not an admin";
  }

  return (
    <section className={`${quantico.className} mt-8 px-2 md:px-0`}>
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 py-1 px-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col md:flex-row justify-between w-[240px] md:w-[600px] md:gap-6">
                  <div className="text-gray-900">
                    {!!user.name && <span>{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <div>
                  <Link className="button" href={"/dashboard/users/" + user._id}>
                  <FaEdit title="Edit" className="text-2xl text-gray-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
