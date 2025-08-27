import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString()

        return session
    },
    async signIn({ profile }: { profile?: any }) {
  try {
    await connectToDB();

    if (!profile?.email) {
      console.log("❌ Google profile missing email");
      return false; // cannot continue
    }

    const userExists = await User.findOne({ email: profile.email });

    if (!userExists) {
      const username =
        profile?.name?.replace(/\s+/g, "").toLowerCase() ||
        profile?.email?.split("@")[0]; // fallback to email prefix

      await User.create({
        email: profile.email,
        username,
        image: profile?.picture || "",
      });
    }

    return true; // ✅ login succeeds
  } catch (err) {
    console.error("🔥 Error in signIn callback", err);
    return false; // triggers AccessDenied if DB errors
  }
}


  },
})


export {handler as GET, handler as POST}