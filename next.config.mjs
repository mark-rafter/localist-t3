// @ts-check

import { env } from "./src/env.mjs";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: new URL(env.SUPABASE_URL).hostname,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
};
export default config;
