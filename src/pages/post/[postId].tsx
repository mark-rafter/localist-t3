import type { GetStaticPropsContext } from "next";

type PostProps = {
  postId: number;
  title: string;
};

export default function Post({ postId, title }: PostProps) {
  return (
    <>
      <div>{postId}</div>
      <div>{title}</div>
    </>
  );
}

const getAllPostIds = async () => {
  return await Promise.resolve([
    { params: { postId: "1" } },
    { params: { postId: "2" } },
    { params: { postId: "3" } },
  ]);
};

export async function getStaticPaths() {
  return {
    paths: await getAllPostIds(),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const postId = context.params?.postId ?? 0;
  const res = await Promise.resolve({ postId, title: "hi" } as PostProps);
  return {
    props: res, // will be passed to the page component as props
  };
}
