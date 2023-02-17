import Image from "next/image";
import React from "react";
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";
import { Carousel } from "flowbite-react";
import { LinkOrDisabled } from "@/components/link-or-disabled";

type DraftFeedItem = {
  title: string;
  size: "xs" | "small" | "medium" | "large" | "xl";
  brand: string;
  price: number;
  images?: string[];
};

type FeedItemProps = DraftFeedItem & {
  postId: number;
  distance: number;
  isPreview?: boolean;
};

export const FeedItem = ({
  postId,
  distance,
  title,
  price,
  size,
  images,
  isPreview,
}: FeedItemProps) => {
  const tailwindSmPixels = 384;
  return (
    <article className="max-w-sm overflow-hidden rounded-lg">
      {images && (
        <div className="h-56 bg-gray-500 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={3000}>
            {[...Array(4).keys()].map((k) => (
              <LinkOrDisabled
                key={k}
                target={`post/${postId}`}
                disabled={isPreview == true}
              >
                <Image
                  src={`https://flowbite.com/docs/images/carousel/carousel-${
                    k + 1
                  }.svg`}
                  alt="..."
                  width={tailwindSmPixels}
                  height={tailwindSmPixels}
                />
              </LinkOrDisabled>
            ))}
          </Carousel>
        </div>
      )}

      <div className="bg-gray-800 p-3 antialiased sm:p-4">
        <div className="flex items-baseline justify-between text-gray-300">
          <h3 className="text-sm uppercase tracking-wide">{size}</h3>
          <span className="inline-flex items-center rounded px-2 text-xs">
            <HiOutlineClock className="mr-1 h-3 w-3" />2 min.
          </span>
        </div>
        <LinkOrDisabled target={`post/${postId}`} disabled={isPreview == true}>
          <h2 className="w-64 truncate pt-1 text-xl font-bold tracking-tight">
            {title}
          </h2>
        </LinkOrDisabled>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">£{price}</span>
          <span className="flex items-center rounded-lg text-sm font-normal text-gray-400">
            <span className="flex-1 whitespace-nowrap">{distance} miles</span>
            <HiOutlineMapPin className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export const DraftFeedItem = (props: DraftFeedItem) => {
  return <FeedItem postId={0} distance={0} {...props} />;
};
