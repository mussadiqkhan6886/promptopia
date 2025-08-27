import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });

      if (sessionUser) {
        // add custom id to session
        (session.user as { id?: string }).id = sessionUser._id.toString();
      }

      return session;
    },

    async signIn({ profile }) {
      try {
        // profile here is of type Profile | undefined
        const googleProfile = profile as GoogleProfile | undefined;

        if (!googleProfile?.email) {
          console.log("Google profile missing email");
          return false;
        }

        await connectToDB();

        const userExists = await User.findOne({ email: googleProfile.email });

        if (!userExists) {
          const username =
            googleProfile.name?.replace(/\s+/g, "").toLowerCase() ||
            googleProfile.email.split("@")[0];

          await User.create({
            email: googleProfile.email,
            username,
            image: googleProfile.picture ?? "",
          });
        }

        return true;
      } catch (err) {
        console.error("Error in signIn callback", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
