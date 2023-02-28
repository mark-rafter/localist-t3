import Head from "next/head";
import React from "react";
import type { FeedPost } from "@/components/feed";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type { GetStaticPropsContext } from "next";

type FeedParams = {
  feedPosts: FeedPost[];
};

export default function FeedPage({ feedPosts }: FeedParams) {
  return (
    <>
      <Head>
        <title>Feed | Localist</title>
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
    include: {
      author: {
        include: {
          location: true,
        },
      },
    },
    orderBy: [{ createdAt: "desc" }],
    skip: currentPage * postsPerPage,
    take: postsPerPage,
  });

  const feedPosts = posts.map((post) => {
    const { id, updatedAt, author, ...feedPost } = post;

    return {
      ...feedPost,
      postId: id,
      coords: [author.location.lat.toNumber(), author.location.long.toNumber()],
      // updatedAt: p.updatedAt.toString(),
    } as FeedPost;
  });

  return {
    props: { feedPosts }, // will be passed to the page component as props
  };
}
