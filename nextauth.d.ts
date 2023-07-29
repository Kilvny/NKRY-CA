// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
// Define a role enum
export enum Role {
  user = "user",
  admin = "admin",
}
// common interface for JWT and Session
interface IUser extends DefaultUser {
  role?: Role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}

/**
 * Step 1: Augmenting the User Object Definition#
To access the role property of our user from anywhere in your application, you have to augment the Session and JWT interface from "next-auth" and "next-auth/jwt" packages.
 */