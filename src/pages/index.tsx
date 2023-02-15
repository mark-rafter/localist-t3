import Head from "next/head";
import React from "react";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Localist</title>
        <meta
          name="description"
          content="Localist - the free small advertising app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FilterDrawer />
      <Feed />
    </>
  );
}
