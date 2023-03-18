import { ClientFeed, Feed, LoadMore } from "@/components/feed";
import { SearchForm } from "@/components/search/search-form";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FeedPage({
  posts: ssrPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getFeed.useInfiniteQuery(
      { searchTerm: "" },
      {
        enabled: typeof window !== "undefined",
        getNextPageParam: (lastPage) => lastPage.postIdCursor,
        refetchOnWindowFocus: false,
      }
    );

  const fetchedPosts = data?.pages.flatMap((page) => page.posts);

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
      <SearchForm />
      {fetchedPosts ? (
        <InfiniteScroll
          dataLength={fetchedPosts.length}
          next={fetchNextPage}
          hasMore={hasNextPage === true}
          loader={
            <LoadMore
              disabled={!hasNextPage || isFetching}
              loading={isFetching}
              onClick={fetchNextPage}
            />
          }
          endMessage={<p className="text-center">All posts fetched!</p>}
        >
          <ClientFeed posts={fetchedPosts} />
        </InfiniteScroll>
      ) : (
        <Feed posts={ssrPosts} />
      )}
      {/* <FilterDrawer /> */}
    </>
  );
}
export async function getStaticProps() {
  const caller = appRouter.createCaller({
    session: null,
    prisma: prisma,
  });

  const props = await caller.post.getFeed({});

  return {
    props: props,
  };
}
