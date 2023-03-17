import { ClientFeed, LoadMore } from "@/components/feed";
import { useSearchRouter } from "@/hooks/use-search-router";
import { api } from "@/utils/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, TextInput } from "flowbite-react";
import Head from "next/head";
import { useEffect } from "react";
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

function OrderBy() {
  return (
    <div>
      <Select id="orderBy" required={true}>
        <option>Newest</option>
        <option>Most Popular</option>
      </Select>
    </div>
  );
}

export function SearchForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });
  const { updateQuery, searchTerm } = useSearchRouter();
  const [parent] = useAutoAnimate();

  const submitForm = async (formData: SearchSchema) => {
    // todo: toast
    return updateQuery(formData);
  };

  useEffect(() => {
    console.log(watch("q"));
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const subscription = watch(() => handleSubmit(submitForm)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  return (
    <form
      className="mx-auto flex"
      ref={parent}
      onSubmit={handleSubmit(submitForm)}
    >
      <div>
        <TextInput
          id="search"
          {...register("q")}
          maxLength={searchMaxLength}
          icon={HiMagnifyingGlass}
          defaultValue={searchTerm}
        />
      </div>
      <OrderBy />
      {errors.q && (
        <p id="q_error_message" className="mt-2 text-xs text-red-400">
          {errors.q.message}
        </p>
      )}
    </form>
  );
}

export default function SearchPage() {
  const { searchTerm } = useSearchRouter();

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
          endMessage={
            <p className="text-center">
              All posts fetched for &ldquo;{searchTerm}&rdquo;
            </p>
          }
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
