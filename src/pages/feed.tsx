import Head from "next/head";
import React from "react";
import { Feed } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { prisma } from "@/server/db";
import type { InferGetStaticPropsType } from "next";
import { api } from "@/utils/api";
import { appRouter } from "@/server/api/root";
import { Button, Spinner } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";

const postsPerPage = 8;

export default function FeedPage({
  posts: ssrPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getFeed.useInfiniteQuery(
      { limit: postsPerPage },
      {
        getNextPageParam: (lastPage) => lastPage.postIdCursor,
        refetchOnWindowFocus: false,
      }
    );

  const fetchedPosts = data?.pages.flatMap((page) => page.posts) ?? ssrPosts;

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
export async function getStaticProps() {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const props = await caller.post.getFeed({ limit: postsPerPage });

  return {
    props: props,
  };
}
