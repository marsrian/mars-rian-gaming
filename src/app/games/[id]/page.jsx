import { quantico, russoOne } from "@/utils/fonts";
import Image from "next/image";

async function getSingleGameData({ id }) {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/games/${id}`, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching game data:", error);
    return [];
  }
}

const SingleGameInfoPage = async ({ params }) => {
  const {game}  = await getSingleGameData(params);
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
      <h1 className={`${russoOne.className} text-white text-3xl font-bold italic mt-3`}>{name}</h1>
      <p className={`${quantico.className} mt-2 text-justify text-zinc-200 md:leading-6`}>{description}</p>
      {videos?.length > 0 &&
        videos.map((v) => {
          return (
            <div key={v._id} className="mt-6">
              <h1 className={`${quantico.className} mb-2 text-3xl text-white`}>Chapter - {v.serial} gameplay</h1>
              <iframe src={v.videoLink} frameBorder="0" allowFullScreen className="w-full h-60 md:h-[600px]" />
            </div>
          );
        })}
    </div>
  );
};

export default SingleGameInfoPage;
