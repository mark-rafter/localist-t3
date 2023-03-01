import Head from "next/head";
import React from "react";
import type { FeedProps } from "@/components/feed";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type { GetServerSidePropsContext } from "next";
import { api } from "@/utils/api";
import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";

export default function FeedPage(feed: FeedProps) {
  // todo: infinite scroll
  // const { data } = api.post.getMany.useQuery({ limit: 8, cursor: feed.cursor });

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <Feed feedPosts={feed.feedPosts} />
      <FilterDrawer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postsPerPage = 8;

  const caller = appRouter.createCaller({
    session: await getServerAuthSession(context),
    prisma: prisma,
  });
  const { feedPosts, cursor } = await caller.post.getMany({
    limit: postsPerPage,
  });

  return {
    props: {
      feedPosts,
      cursor,
    },
  };
}
