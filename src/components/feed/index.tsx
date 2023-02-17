import React from "react";
import { FeedItem } from "./feed-item";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export const Feed = () => {
  return (
    <div
      className="mb-4 grid grid-cols-1 justify-items-center gap-4 rounded-lg p-4 
    lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {[...Array(8).keys()].map((k) => (
        <FeedItem
          key={k + 1}
          postId={k + 1}
          title="Unisex plain purple nylon tee, 3 years old"
          brand="nike"
          images={["/tshirt-474px.jpg"]}
          price={33}
          distance={22}
          size={"small"}
        />
      ))}
    </div>
  );
};
