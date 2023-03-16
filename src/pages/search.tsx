import { ClientFeed, LoadMore } from "@/components/feed";
import { api } from "@/utils/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import InfiniteScroll from "react-infinite-scroll-component";
import { z } from "zod";

const postsPerPage = 8;
const searchMaxLength = 32;

const searchSchema = z.object({
  q: z.string().max(searchMaxLength, { message: "Query too long" }).default(""),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });
  const router = useRouter();
  const [parent] = useAutoAnimate();

  const submitForm = handleSubmit(async (formData) => {
    // todo: toast
    return await router.push(
      {
        pathname: "/search",
        query: { ...formData },
      },
      undefined,
      { shallow: true }
    );
  });

  return (
    <form className="mx-auto w-80 sm:w-96" ref={parent} onSubmit={submitForm}>
      <TextInput
        id="search"
        {...register("q")}
        maxLength={searchMaxLength}
        icon={HiMagnifyingGlass}
        placeholder="e.g. womens nike trainers size 10"
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-2 text-md font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go
      </button>
      {errors.q && (
        <p id="q_error_message" className="mt-2 text-xs text-red-400">
          {errors.q.message}
        </p>
      )}
    </form>
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
