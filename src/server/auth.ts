import type { GetServerSidePropsContext } from "next";
import type { User } from "next-auth";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import { prisma } from "./db";
import { Coordinates } from "@/types/coordinates.js";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & User &
      DefaultSession["user"];
  }

  interface User {
    coords: Coordinates;
    locationId: number;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.locationId = user.locationId;
        session.user.coords = user.coords;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.coords) {
        // todo: get latlong from IP?
        const lat = 51.5;
        const long = 0.0;
        const location = await prisma.location.create({
          data: {
            lat: lat,
            long: long,
          },
        });
        user.locationId = location.id;
        user.coords = { lat, long };
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // we cannot use OAuth in preview environments because of the randomly generated subdomain suffix
    env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize() {
            return (await Promise.resolve({
              id: "1",
              name: "J Smith",
              email: "jsmith@example.com",
              image: "https://i.pravatar.cc/150?u=jsmith@example.com",
            })) as User;
          },
        })
      : GitHubProvider({
          clientId: env.GITHUB_ID,
          clientSecret: env.GITHUB_SECRET,
        }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  pages: {
    signIn: "/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
