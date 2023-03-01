import { calculate } from "@/helpers/distance";
import type { Coordinates } from "@/types/coordinates";
import type { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { FeedItem } from "./feed-item";

export type PostWithCoords = Post & { coords: Coordinates };

export type FeedProps = {
  feedPosts: PostWithCoords[];
  cursor?: string;
};

export const Feed = ({ feedPosts }: FeedProps) => {
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
      {feedPosts.map((item) => {
        const distance = calculate(userCoords, item.coords);
        return <FeedItem key={item.id} {...item} distance={distance} />;
      })}
    </div>
  );
};
