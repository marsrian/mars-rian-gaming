import { Quantico } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const quantico = Quantico({
  weight: ["400"],
  subsets: ["latin"],
});

const DashBoardTabs = ({ isAdmin }) => {
  const pathName = usePathname();
  return (
    <div
      className={`${quantico.className} flex justify-center items-center gap-6`}
    >
      <Link
        className={pathName === "/dashboard/profile" ? "text-green-400" : ""}
        href="/dashboard/profile"
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={
              pathName === "/dashboard/category" ? "text-green-400" : ""
            }
            href="/dashboard/category"
          >
            Category
          </Link>
          <Link
            className={
              pathName.includes("dashboard/games") ? "text-green-400" : ""
            }
            href="/dashboard/games"
          >
            Games
          </Link>
          <Link
            className={
              pathName.includes("dashboard/blogs") ? "text-green-400" : ""
            }
            href="/dashboard/blogs"
          >
            Blogs
          </Link>
          <Link
            className={pathName === "/dashboard/users" ? "text-green-400" : ""}
            href="/dashboard/users"
          >
            Users
          </Link>
        </>
      )}
    </div>
  );
};

export default DashBoardTabs;
