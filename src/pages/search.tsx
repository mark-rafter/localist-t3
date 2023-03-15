import { ClientFeed, LoadMore } from "@/components/feed";
import { api } from "@/utils/api";
import { TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";

const postsPerPage = 8;

export function SearchForm() {
  // todo: react hook form or form GET
  return (
    <div className="relative mx-auto w-96">
      <form action="/search" method="get">
        <TextInput
          id="search"
          name="q"
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
      </form>
    </div>
  );
}
function useSearchTerm() {
  const { query } = useRouter();
  const { q: searchTerm } = query;
  if (!searchTerm) return "";
  if (typeof searchTerm === "string") return searchTerm;
  return searchTerm[0] || "";
}

export default function SearchPage() {
  const searchTerm = useSearchTerm();

  const { data, hasNextPage, fetchNextPage, isFetching } =
    api.post.getFeed.useInfiniteQuery(
      { limit: postsPerPage, searchTerm: searchTerm },
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
          endMessage={<p className="text-center">All posts fetched!</p>}
        >
          <ClientFeed posts={fetchedPosts} />
        </InfiniteScroll>
      ) : (
        <>todo: skeleton</>
      )}
      {/* <FilterDrawer /> */}
    </>
  );
}
