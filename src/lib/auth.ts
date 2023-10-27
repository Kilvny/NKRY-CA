import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { userService } from "../services/UserService";
import { login } from "@/services/authentication.service";
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // * mockup method to test signing in 
    // CredentialsProvider({
    //   name: "Sign in",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@example.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = { id: "1", name: "Admin", email: "admin@admin.com" };
    //     console.log(credentials)
    //     return user;
    //   },
    // }),
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const { email, password } = credentials;
        // return userService.signInCredentials(email, password);
        const user = await login(email, password);
        if (user) {
            // If login is successful, return the user object
            return Promise.resolve(user);
          } else {
            // If login fails, return null
            return Promise.resolve(null);
          }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session({ session, token, user }) {
      if (token) {
        // Set the token in the session if it exists
        session.user = token; // Assuming the token is available as `token` from your login function
      }

      if (user) {
        // Update the session user object
        session.user = user;
      }

      return session;
    },
//     async jwt({ token, user }) {
//       /* Step 1: update the token based on the user object */
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
    // session({ session, token, user }) {
    //   /* Step 2: update the session.user based on the token object */
    //   if (token && session.user) {
    //     session.user.role = token?.role;
    //     session.user = user
    //   }
    //   return session;
    // },
  },
};

