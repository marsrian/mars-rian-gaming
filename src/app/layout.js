import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import AppProvider from "@/components/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen max-w-6xl mx-auto 
        bg-[url(/bg-1.jpg)] 
        bg-cover`}
      >
        <AppProvider>
          <Toaster />
          <div className="sticky top-0 z-10">
            <Header />
          </div>
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
