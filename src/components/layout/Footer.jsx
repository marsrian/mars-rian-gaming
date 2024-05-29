import { quantico } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={`${quantico.className} bg-slate-700 p-4 md:p-12 text-white mt-12`}
    >
      <div className="flex flex-col md:flex-row justify-between md:px-20">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="logo"
              className="rounded-full mb-1"
            />
          </Link>
          <h3 className="font-bold mb-5 md:mb-0">MARS RIAN GAMING</h3>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Resources</h3>
          <ul className="flex flex-col gap-2">
            <Link href="/category">
              <li>Category</li>
            </Link>
            <Link href="/blog" className="mb-5 md:mb-0">
              <li>Blogs</li>
            </Link>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="flex flex-col gap-2">
            {/* <Link href=""> */}
            <li>FAQ</li>
            {/* </Link> */}
            {/* <Link href=""> */}
            <li>About Us</li>
            {/* </Link> */}
            {/* <Link href=""> */}
            <li className="mb-5 md:mb-0">Terms & legals</li>
            {/* </Link> */}
            {/* <Link href=""> */}
            {/* <li>Privacy policy</li> */}
            {/* </Link> */}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-2">
            <Link
              href="https://www.facebook.com/profile.php?id=61556523663994"
              target="_blank"
              className="text-2xl"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://www.youtube.com/@marsriangaming"
              target="_blank"
              className="text-2xl mb-5 md:mb-0"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>
      <hr className="my-4 md:my-6 w-full md:w-[600px] mx-auto" />
      <p className="text-center">
        © {currentYear}, MARS RIAN GAMING. All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
