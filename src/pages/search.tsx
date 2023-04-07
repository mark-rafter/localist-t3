import { ClientFeed, LoadMore, SkeletonFeed } from "@/components/feed";
import { SearchForm } from "@/components/search/search-form";
import { useSearchRouter } from "@/hooks/use-search-router";
import { api } from "@/utils/api";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchPage() {
  const { searchTerm } = useSearchRouter();

  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getFeed.useInfiniteQuery(
      { searchTerm: searchTerm },
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
        <title>{`Results for "${searchTerm}" | Localist`}</title>
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
          endMessage={
            <p className="text-center">
              All posts fetched for &ldquo;{searchTerm}&rdquo;
            </p>
          }
        >
          <ClientFeed posts={fetchedPosts} />
        </InfiniteScroll>
      ) : (
        <SkeletonFeed />
      )}
      {/* <FilterDrawer /> */}
    </>
  );
}
