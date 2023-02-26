import { ssrNotFound } from "@/helpers/response";
import { prisma } from "@/server/db";
import type { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type PostPageParams = {
  postId: string;
};

type PostPageProps = {
  postId: number;
  title: string;
};

export default function PostPage({ postId, title }: PostPageProps) {
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

export async function getStaticProps(
  context: GetStaticPropsContext<PostPageParams>
) {
  const postId = Number(context.params?.postId);

  if (isNaN(postId)) {
    return ssrNotFound;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return ssrNotFound;
  }

  return {
    props: { postId, title: post?.title }, // will be passed to the page component as props
  };
}
