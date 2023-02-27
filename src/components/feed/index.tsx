import type { Post } from "@prisma/client";
import React from "react";
import { FeedItem } from "./feed-item";

export type FeedPost = Post & { postId: number; coords: number[] };

export const Feed = ({ feedPosts }: { feedPosts: FeedPost[] }) => {
  return (
    <div
      className="mb-4 grid grid-cols-1 
      justify-items-center gap-4 
      rounded-lg p-4 
      lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {feedPosts.map((item) => (
        <FeedItem key={item.postId} {...item} distance={22} />
      ))}
    </div>
  );
};
