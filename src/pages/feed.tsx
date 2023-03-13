import { Feed, LoadMore } from "@/components/feed";
import FilterDrawer from "@/components/filter-drawer";
import { safeParseFloat } from "@/helpers/parse";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import { getCookie } from "cookies-next";
import type { InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

const postsPerPage = 8;

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

  // todo: refactor into useUserCoords()
  const { data: sessionData } = useSession();

  const userCoords = {
    lat:
      sessionData?.user.lat ??
      safeParseFloat(getCookie("x-vercel-ip-latitude"), 51.5),
    long:
      sessionData?.user.long ??
      safeParseFloat(getCookie("x-vercel-ip-longitude"), 51.5),
  };

  const fetchedPosts = data?.pages.flatMap((page) => page.posts);

  return (
    <>
      <Head>
        <title>Feed | Localist</title>
      </Head>
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
          <Feed posts={fetchedPosts} userCoords={userCoords} />
        </InfiniteScroll>
      ) : (
        <Feed posts={ssrPosts} />
      )}
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
