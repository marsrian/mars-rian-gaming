"use client";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import useProfile from "@/components/layout/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="max-w-2xl mx-auto mt-8">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                <div className="text-gray-900">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">No name</span>}
                </div>
                <span className="text-gray-500">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={'/users/'+user._id}>Edit</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
