import Image from "next/image";
import React from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const FeedItem = ({ postId }: { postId: number }) => {
  const tailwindSmPixels = 384;
  return (
    <article className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href={`post/${postId}`}>
        <Image
          className="rounded-t-lg"
          width={tailwindSmPixels}
          height={tailwindSmPixels}
          src="/tshirt-474px.jpg"
          alt=""
        />
      </a>
      <div className="p-4">
        <a href="#">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Unisex plain purple tee
          </h2>
          <h3 className="text-gray-700 dark:text-gray-300">Small</h3>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            £{getRandomInt(1, 300)}
          </span>
          <span className="flex items-center rounded-lg p-2 text-sm font-normal text-gray-400">
            <span className="flex-1 whitespace-nowrap">
              {getRandomInt(1, 99)} miles
            </span>
            <MapPinIcon className="h-6" />
          </span>
        </div>
      </div>
    </article>
  );
};

export const Feed = () => (
  <div
    className="mb-4 grid grid-cols-1 justify-items-center gap-4 rounded-lg p-4 
    lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
  >
    {[...Array(8).keys()].map((k) => (
      <FeedItem key={k + 1} postId={k + 1} />
    ))}
  </div>
);
