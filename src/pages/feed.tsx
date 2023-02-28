import Head from "next/head";
import React from "react";
import type { PostWithCoords, FeedProps } from "@/components/feed";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type { GetServerSidePropsContext } from "next";
import { api } from "@/utils/api";

export default function FeedPage(feed: FeedProps) {
  const { data } = api.post.getMany.useQuery({ limit: 8, cursor: "" });

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      {data?.feedPosts && <Feed feedPosts={data.feedPosts} />}
      <FilterDrawer />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    const { updatedAt, author, ...feedPost } = post;
    const { lat, long } = author.location;

    return {
      ...feedPost,
      coords: {
        lat: lat.toNumber(),
        long: long.toNumber(),
      },
      // updatedAt: p.updatedAt.toString(),
    } as PostWithCoords;
  });

  return {
    props: {
      feedPosts,
    },
  };
}
