import Head from "next/head";
import React from "react";
import type { FeedPost } from "@/components/feed";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";

import { prisma } from "@/server/db";
import type { GetStaticPropsContext } from "next";

type HomeParams = {
  feedPosts: FeedPost[];
};

export default function Home({ feedPosts }: HomeParams) {
  return (
    <>
      <Head>
        <title>Home | Localist</title>
      </Head>
      <Feed feedPosts={feedPosts} />
      <FilterDrawer />
    </>
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const currentPage = 0;
  const postsPerPage = 8;

  const posts = await prisma.post.findMany({
    skip: currentPage * postsPerPage,
    take: postsPerPage,
  });

  const feedPosts = posts.map((post) => {
    const { id, createdAt, updatedAt, ...feedPost } = post;

    return {
      ...feedPost,
      postId: id,
      // createdAt: p.createdAt.toString(),
      // updatedAt: p.updatedAt.toString(),
    } as FeedPost;
  });

  return {
    props: { feedPosts }, // will be passed to the page component as props
  };
}
