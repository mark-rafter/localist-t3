import Head from "next/head";
import React, { useEffect, useState } from "react";
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
import { Button, Spinner } from "flowbite-react";
import type { getServerSideProps } from "@/pages/signin";

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = (winScroll / height) * 100;
    setScrollPosition(scrolled);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}

export default function FeedPage({
  posts,
  cursor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getMany.useInfiniteQuery(
      { limit: 8 },
      { getNextPageParam: (lastPage) => lastPage.cursor }
    );

  const scrollPosition = useScrollPosition();

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage().catch(console.error);
    }
  }, [scrollPosition, hasNextPage, isFetching, fetchNextPage]);

  const fetchedPosts = data?.pages.flatMap((page) => page.posts) ?? posts;

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <Feed posts={fetchedPosts} />
      <FilterDrawer />
      <div className="flex justify-center">
        <Button
          className="w-64"
          color="gray"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {isFetching ? (
            <>
              <Spinner size="sm" className="mr-3" light={true} />
              Loading...
            </>
          ) : (
            <>Load more</>
          )}
        </Button>
      </div>
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
