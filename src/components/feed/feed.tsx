import type { Coordinates } from "@/helpers/distance";
import { humanize } from "@/helpers/distance";
import { relativeTimeFromDates } from "@/helpers/relative-time";
import type { RouterOutputs } from "@/utils/api";
import { FeedItem, SkeletonFeedItem } from "./feed-item";
import { useUserCoords } from "@/hooks/use-user-coords";

export type FeedProps = {
  posts: RouterOutputs["post"]["getFeed"]["posts"];
  userCoords?: Coordinates;
};

export function SkeletonFeed() {
  return (
    <div
      className="mb-4 grid grid-cols-1 justify-items-center gap-4 rounded-lg p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {[...Array(8).keys()].map((k) => (
        <SkeletonFeedItem key={k} />
      ))}
    </div>
  );
}

export function Feed({ posts, userCoords }: FeedProps) {
  return (
    <div
      className="mb-4 grid grid-cols-1 justify-items-center gap-4 rounded-lg p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {posts.map((post) => {
        const postCoords = {
          lat: post.author.lat,
          long: post.author.long,
        };
        const distance = userCoords ? humanize(userCoords, postCoords) : "";
        const postAge = relativeTimeFromDates(post.createdAt);
        return (
          <FeedItem
            key={post.id}
            {...post}
            postAge={postAge}
            distance={distance}
          />
        );
      })}
    </div>
  );
}

export function ClientFeed({ posts }: FeedProps) {
  const userCoords = useUserCoords();
  return <Feed posts={posts} userCoords={userCoords} />;
}
