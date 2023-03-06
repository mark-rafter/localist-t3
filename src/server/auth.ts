import type { GetServerSidePropsContext } from "next";
import type { User } from "next-auth";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import { prisma } from "./db";
import { safeParseFloat } from "@/helpers/parse";

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
    lat: number;
    long: number;
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
export const getAuthOptions = (
  req: GetServerSidePropsContext["req"]
): NextAuthOptions => {
  return {
    callbacks: {
      session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
          session.user.lat = user.lat;
          session.user.long = user.long;
          // session.user.role = user.role; <-- put other properties on the session here
        }
        return session;
      },
      signIn({ user }) {
        if (!user.lat) {
          user.lat = safeParseFloat(req.headers["x-vercel-ip-latitude"], 51.5);
          user.long = safeParseFloat(req.headers["x-vercel-ip-longitude"], 0.0);
        }
        return true;
      },
    },
    adapter: PrismaAdapter(prisma),
    providers: getProviders(),
    pages: {
      signIn: "/signin",
    },
  };
};

function getProviders() {
  // we cannot use OAuth in preview environments because of the randomly generated subdomain suffix
  if (env.VERCEL_ENV === "preview") {
    return [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "jsmith",
          },
          password: { label: "Password", type: "password" },
        },
        authorize() {
          return {
            id: "1",
            name: "J Smith",
            email: "jsmith@example.com",
            image: "https://i.pravatar.cc/150?u=jsmith@example.com",
          } as User;
        },
      }),
    ];
  }

  return [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    SpotifyProvider({
      clientId: env.SPOTIFY_ID,
      clientSecret: env.SPOTIFY_SECRET,
    }),
  ];
}

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
  return getServerSession(ctx.req, ctx.res, getAuthOptions(ctx.req));
};
