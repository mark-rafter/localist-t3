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
import { Button, Spinner } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FeedPage({
  posts,
  cursor,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getMany.useInfiniteQuery(
      { limit: 8 },
      {
        getNextPageParam: (lastPage) => lastPage.cursor,
        refetchOnWindowFocus: false,
      }
    );

  const fetchedPosts = data?.pages.flatMap((page) => page.posts) ?? posts;

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <InfiniteScroll
        dataLength={fetchedPosts.length}
        next={fetchNextPage}
        hasMore={hasNextPage === true}
        loader={
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
        }
        endMessage={<p className="text-center">All posts fetched!</p>}
      >
        <Feed posts={fetchedPosts} />
      </InfiniteScroll>
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
  const props = await caller.post.getMany({ limit: postsPerPage });

  return {
    props: props,
  };
}
