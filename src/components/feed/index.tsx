import { calculate } from "@/helpers/distance";
import type { RouterOutputs } from "@/utils/api";
import { useSession } from "next-auth/react";
import React from "react";
import { FeedItem } from "./feed-item";

export type FeedProps = {
  posts: RouterOutputs["post"]["getMany"]["posts"];
  cursor?: string;
};

export const Feed = ({ posts }: FeedProps) => {
  const { data } = useSession();
  const userCoords = data?.user
    ? { lat: data.user.lat, long: data.user.long }
    : { lat: 51.5, long: 0.0 };
  return (
    <div
      className="mb-4 grid grid-cols-1 
      justify-items-center gap-4 
      rounded-lg p-4 
      lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {posts.map((post) => {
        const postCoords = {
          lat: post.author.lat,
          long: post.author.long,
        };
        const distance = calculate(userCoords, postCoords);
        return <FeedItem key={post.id} {...post} distance={distance} />;
      })}
    </div>
  );
};
