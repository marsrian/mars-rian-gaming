"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PaginationControls = ({ hasNextPage, hasPrevPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        className={`w-12 text-white p-1 rounded-sm ${!hasPrevPage ? "bg-emerald-300" : "bg-emerald-700"}`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/games?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev
      </button>

      <div className="bg-white p-1 rounded-sm">
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className={`w-12 text-white p-1 rounded-sm ${!hasNextPage ? "bg-emerald-300" : "bg-emerald-700"}`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/games?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next
      </button>
    </div>
  );
};

export default PaginationControls;