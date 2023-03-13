import { ClientFeed, Feed, LoadMore } from "@/components/feed";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { TextInput } from "flowbite-react";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";

const postsPerPage = 8;

function SearchForm() {
  return (
    <div className="relative mx-auto w-96">
      <TextInput
        id="searchTerm"
        name="searchTerm"
        maxLength={32}
        icon={HiMagnifyingGlass}
        placeholder="e.g. womens nike trainers size 10"
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-2 text-md font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go
      </button>
    </div>
  );
}

export default function FeedPage({
  posts: ssrPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getFeed.useInfiniteQuery(
      { limit: postsPerPage },
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

  const props = await caller.post.getFeed({ limit: postsPerPage });

  return {
    props: props,
  };
}
