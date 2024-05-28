"use client"
import DashBoardTabs from '@/components/layout/DashBoardTabs'
import UserForm from '@/components/layout/UserForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const session = useSession();

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Failed to save!",
    });
  }

  function handleFileChange(ev) {}

  

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  return (
    <div className="mt-6 px-2 md:px-0">
      <DashBoardTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </div>
  )
}

export default ProfilePage
