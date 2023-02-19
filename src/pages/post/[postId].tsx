import { prisma } from "@/server/db";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type PostProps = {
  postId: number;
  title: string;
};

export default function Post({ postId, title }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    <p>TODO: render skeleton</p>;
  }

  return (
    <>
      <div>{postId}</div>
      <div>{title}</div>
    </>
  );
}

const getAllPostIds = async () => {
  const postIds = await prisma.post.findMany({ select: { id: true } });
  return postIds.map((p) => p.id);
};

export async function getStaticPaths() {
  const postIds = await getAllPostIds();
  const paths = postIds.map((id) => ({ params: { postId: id.toString() } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const postId = Number(context.params?.postId);

  if (isNaN(postId)) {
    return {
      props: { postId }, // will be passed to the page component as props
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return {
    props: { postId, title: post?.title }, // will be passed to the page component as props
  };
}
