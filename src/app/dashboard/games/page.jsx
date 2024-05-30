"use client";
import Right from "@/components/Icons/Right";
import DashBoardTabs from "@/components/layout/DashBoardTabs";
import useProfile from "@/components/layout/useProfile";
import { quantico } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const GamesPage = () => {
  const [gameItems, setGameItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/games").then((res) => {
      res.json().then((gameItems) => {
        setGameItems(gameItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading games info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 px-2 md:px-0">
      <DashBoardTabs isAdmin={true} />
      <div className={`${quantico.className} mt-8 max-w-2xl mx-auto`}>
        <Link className="button border border-gray-600 rounded-md p-2" href={"/dashboard/games/new"}>
          Create new game walkthrough <Right />
        </Link>
      </div>
      <div className={`${quantico.className}`}>
        <h2 className="text-sm text-gray-500 mt-8">Edit game item:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
          {gameItems.length > 0 &&
            gameItems.map((item) => (
              <Link
                href={"/dashboard/games/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
                key={item._id}
              >
                <div className="relative">
                  <Image
                    className="rounded-md w-full h-36 md:h-[200px]"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center mt-1">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GamesPage;
