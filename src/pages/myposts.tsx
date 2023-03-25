import { ClientFeed } from "@/components/feed";
import { api } from "@/utils/api";
import Head from "next/head";

export default function MyPostsPage() {
  const { data, isFetching } = api.post.getMyFeed.useQuery();

  if (isFetching) {
    return <>Todo: skeleton</>;
  }

  return (
    <>
      <Head>
        <title>My Posts | Localist</title>
      </Head>
      {isFetching ? <>TODO: skeleton</> : data && <ClientFeed posts={data} />}
    </>
  );
}
