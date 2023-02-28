import Head from "next/head";
import React from "react";
import type { FeedPost, FeedProps } from "@/components/feed";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";

export default function FeedPage(feed: FeedProps) {
  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <Feed {...feed} />
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
    const { id, updatedAt, author, ...feedPost } = post;
    const { lat, long } = author.location;

    return {
      ...feedPost,
      postId: id,
      coords: {
        lat: lat.toNumber(),
        long: long.toNumber(),
      },
      // updatedAt: p.updatedAt.toString(),
    } as FeedPost;
  });

  return {
    props: {
      feedPosts,
      userCoords: await getUserLocation(context),
    },
  };
}

const getUserLocation = async (context: GetServerSidePropsContext) => {
  const defaultLocation = {
    lat: 51.5,
    long: 0.0,
  };

  const session = await getServerAuthSession(context);

  if (!session) {
    return defaultLocation;
  }

  console.log("userLocationId", session.user.userLocationId);

  const userLocation = await prisma.location.findUnique({
    where: {
      id: session.user.userLocationId,
    },
    select: {
      lat: true,
      long: true,
    },
  });

  if (!userLocation) {
    return defaultLocation;
  }

  return {
    lat: userLocation.lat.toNumber(),
    long: userLocation.long.toNumber(),
  };
};
