import Head from "next/head";
import React from "react";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { api } from "@/utils/api";
import { appRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "flowbite-react";

export default function FeedPage({
  posts,
  cursor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getMany.useInfiniteQuery(
      { limit: 8 },
      { getNextPageParam: (lastPage) => lastPage.cursor }
    );

  const fetchedPosts = data?.pages.flatMap((page) => page.posts) ?? posts;

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <Feed posts={fetchedPosts} />
      <FilterDrawer />
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetching}
      >
        Load More
      </Button>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const postsPerPage = 8;

  const caller = appRouter.createCaller({
    session: await getServerAuthSession(context),
    prisma: prisma,
  });
  const props = await caller.post.getMany({ limit: postsPerPage });

  return {
    props: props,
  };
}
