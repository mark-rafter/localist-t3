import type { Coordinates } from "@/helpers/distance";
import { humanize } from "@/helpers/distance";
import { relativeTimeFromDates } from "@/helpers/relative-time";
import { usePersistedState } from "@/hooks/use-persisted-state";
import type { RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import React from "react";
import { FeedItem } from "./feed-item";

export type FeedProps = {
  posts: RouterOutputs["post"]["getMany"]["posts"];
  cursor?: string;
};

export function Feed({ posts }: FeedProps) {
  const { data } = useSession();
  // todo: set geo cookie in middleware and extract defaults
  const [userCoords] = usePersistedState<Coordinates>("user-coords", {
    lat: data?.user.lat ?? 51.5,
    long: data?.user.long ?? 0.0,
  });

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
        const distance = humanize(userCoords, postCoords);
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
