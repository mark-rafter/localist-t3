import Head from "next/head";
import React from "react";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Localist</title>
      </Head>
      <FilterDrawer />
      <Feed />
    </>
  );
}
