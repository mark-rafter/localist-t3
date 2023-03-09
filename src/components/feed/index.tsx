import { humanize } from "@/helpers/distance";
import { relativeTimeFromDates } from "@/helpers/relative-time";
import useUserCoords from "@/hooks/use-user-coords";
import type { RouterOutputs } from "@/utils/api";
import { FeedItem } from "./feed-item";

export type FeedProps = {
  posts: RouterOutputs["post"]["getFeed"]["posts"];
  cursor?: string;
};

export function Feed({ posts }: FeedProps) {
  const { getUserCoords } = useUserCoords();
  // todo: set geo cookie in middleware and extract defaults

  return (
    <div
      className="mb-4 grid grid-cols-1 justify-items-center gap-4 rounded-lg p-4 
      lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {posts.map((post) => {
        const postCoords = {
          lat: post.author.lat,
          long: post.author.long,
        };
        const distance = humanize(getUserCoords(), postCoords);
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
