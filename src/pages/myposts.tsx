import { ClientFeed, SkeletonFeed } from "@/components/feed";
import { api } from "@/utils/api";
import Head from "next/head";

export default function MyPostsPage() {
  const { data, isFetching } = api.post.getMyFeed.useQuery();

  return (
    <>
      <Head>
        <title>My Posts | Localist</title>
      </Head>
      {isFetching ? <SkeletonFeed /> : data && <ClientFeed posts={data} />}
    </>
  );
}
