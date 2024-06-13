import { quantico, russoOne } from "@/utils/fonts";
import Image from "next/image";

async function getSingleBlogData({ id }) {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/blogs/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

const SingleBlogPage = async ({ params }) => {
  const { blog } = await getSingleBlogData(params);
  const { title, category, video, desc } = blog;
  return (
    <div className="mb-4 md:mb-8 px-4 md:px-0">
      <h1
        className={`${russoOne.className} text-white text-xl md:text-3xl font-bold italic mt-3`}
      >
        {title}
      </h1>
      <p className="mt-2 text-gray-300">Category: {category}</p>
      {desc.length > 0 &&
        desc.map((d) => {
          return (
            <div key={d._id} className="mt-6">
              {d.description && (
                <p
                  className={`${quantico.className} mb-2 text-zinc-100 text-justify`}
                >
                  {d.description}
                </p>
              )}
              {d.imageLink && (
                <Image
                  src={d.imageLink}
                  width={600}
                  height={600}
                  alt="tutorial image"
                  className="w-full max-h-96"
                />
              )}
            </div>
          );
        })}
      {video && (
        <div>
          <h1
            className={`${russoOne.className} text-white text-xl font-semibold italic mt-6 mb-1`}
          >
            Video tutorial:
          </h1>
          <iframe
            src={video}
            // width="560"
            height="500"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen="true"
            className="w-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SingleBlogPage;
