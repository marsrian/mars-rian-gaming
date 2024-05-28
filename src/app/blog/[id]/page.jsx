import { Quantico, Russo_One } from "next/font/google";
import Image from "next/image";

const getSingleBlogData = async ({ id }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const russoOne = Russo_One({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const quantico = Quantico({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const SingleBlogPage = async ({ params }) => {
  const { blog } = await getSingleBlogData(params);
  const { _id, title, category, video, desc } = blog;
  return (
    <div className="mb-4 md:mb-8 px-4 md:px-0">
      <h1
        className={`${russoOne.className} text-gray-700 text-xl md:text-3xl font-bold italic mt-3`}
      >
        {title}
      </h1>
      <p className="mt-2">Category: {category}</p>
      {desc.length > 0 &&
        desc.map((d) => {
          return (
            <div key={d._id} className="mt-6">
              <p className={`${quantico.className} mb-2`}>{d.description}</p>
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
            className={`${russoOne.className} text-gray-700 text-xl font-semibold italic mt-6 mb-1`}
          >
            Video tutorial:
          </h1>
          <iframe
            src={video}
            // width="560"
            height="500"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
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
