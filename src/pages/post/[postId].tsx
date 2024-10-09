import { SkeletonOrChildren } from "@/components";
import { ssrNotFound } from "@/helpers/response";
import { prisma } from "@/server/db";
import { api } from "@/utils/api";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <Head>
          <title>Loading post... | Localist</title>
        </Head>
        <p>TODO: render post skeleton</p>
      </>
    );
  }

  return <LoadedPage {...props} />;
}

function LoadedPage({
  id,
  title,
  size,
  price,
  details,
  images,
  author,
  viewCount,
  createdAt,
  updatedAt,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: authorRating, isFetching } = api.user.getRating.useQuery(
    author.id
  );

  const smPixels = 384;

  return (
    <>
      <Head>
        <title>{`${title} £${price} | Localist`}</title>
      </Head>
      <div className="flex">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${title} Image ${index + 1}`}
            width={smPixels}
            height={smPixels}
          />
        ))}
      </div>
      <div>{id}</div>
      <div>{title}</div>
      <div>{size}</div>
      <div>£{price}</div>
      <div>{details?.toString()}</div>
      <div>author: {author.name}</div>
      <div>
        <SkeletonOrChildren showSkeleton={isFetching} className="h-6 w-16">
          rating: {authorRating}
        </SkeletonOrChildren>
      </div>
      <div>
        location: [{author.lat}, {author.long}]
      </div>
      <div>views: {viewCount}</div>
      <div>created: {createdAt.toDateString()}</div>
      <div>updated: {updatedAt.toDateString()}</div>
    </>
  );
}

async function getRecentPostIds() {
  const posts = await prisma.post.findMany({
    take: 8,
    select: { id: true },
    orderBy: { id: "desc" },
  });
  return posts.map((p) => p.id.toString());
}

export async function getStaticPaths() {
  const postIds = await getRecentPostIds();
  const paths = postIds.map((id) => ({ params: { postId: id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ postId: string }>
) {
  // todo?: make postId a number and remove this check?
  const postId = Number(context.params?.postId);

  if (isNaN(postId)) {
    return ssrNotFound;
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return ssrNotFound;
  }

  return {
    props: post,
  };
}
