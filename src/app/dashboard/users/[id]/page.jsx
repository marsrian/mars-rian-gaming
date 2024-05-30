"use client"
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import UserForm from "@/components/layout/UserForm";
import useProfile from "@/components/layout/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { data, loading } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/profile?_id=${id}`).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved!",
      error: "Error !",
    });
  }

  if (loading) {
    return "Loading user data...";
  }

  if (!data.admin) {
    return "You are not an admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  )
};

export default EditUserPage;
