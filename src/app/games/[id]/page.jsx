import { Quantico, Russo_One } from "next/font/google";
import Image from "next/image";

const getSingleGameData = async ({ id }) => {
  try {
    const res = await fetch(`http://localhost:3000/api/games/${id}`, {
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
  weight: ["400",],
  style: ["normal",],
  subsets: ["latin"],
  display: "swap",
});

const quantico = Quantico({
  weight: ["400",],
  style: ["normal",],
  subsets: ["latin"],
  display: "swap",
});

const SingleGameInfoPage = async ({ params }) => {
  const { game } = await getSingleGameData(params);
  const { _id, name, image, description, videos } = game;
  return (
    <div className="mb-8 px-4 md:px-0">
      <Image
        src={image}
        width={600}
        height={600}
        alt={name}
        className="w-full max-h-96"
      />
      <h1 className={`${russoOne.className} text-gray-700 text-3xl font-bold italic mt-3`}>{name}</h1>
      <p className="mt-2 text-justify">{description}</p>
      {videos.length > 0 &&
        videos.map((v) => {
          return (
            <div key={v._id} className="mt-6">
              <h1 className={`${quantico.className} mb-2 text-3xl`}>Chapter - {v.serial} gameplay</h1>
              <iframe src={v.videoLink} frameborder="0" allowfullscreen className="w-full h-60 md:h-[600px]" />
            </div>
          );
        })}
    </div>
  );
};

export default SingleGameInfoPage;
