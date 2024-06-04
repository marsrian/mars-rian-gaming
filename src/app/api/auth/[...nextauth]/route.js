import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import nextAuth from "next-auth";
import connectMongo from "@/libs/connectMongo";

async function login(credentials) {
  try {
    connectMongo();
    const user = await User.findOne({ email: credentials.email});
    if (!user) {
      throw new Error("wrong credentials");
    }
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) {
      throw new Error("wrong credentials");
    }
    return user;
  } catch (error) {
    console.log("error while logging in.");
    throw new Error("Something went wrong");
  }
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          throw new Error("failed to login.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // secret: process.env.NEXTAUTH_SECRET,
};

const handler = nextAuth(authOptions);
export { handler as POST, handler as GET };
