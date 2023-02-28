import Image from "next/image";
import React from "react";
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";
import { Carousel } from "flowbite-react";
import { LinkOrDisabled } from "@/components/link-or-disabled";
import { relativeTimeFromDates } from "@/helpers/relative-time";

type ItemSize = "xs" | "small" | "medium" | "large" | "xl";

type DraftFeedItem = {
  title: string;
  size: ItemSize;
  brand: string;
  price: number;
  images?: string[];
};

export type FeedItemProps = DraftFeedItem & {
  postId: number;
  distance: number; // todo: non-primitive
  createdAt?: Date;
  isPreview?: boolean;
};

export const FeedItem = ({
  postId,
  title,
  price,
  size,
  images,
  distance,
  createdAt,
  isPreview = false,
}: FeedItemProps) => {
  const tailwindSmPixels = 384;
  const createdAtTimeAgo = relativeTimeFromDates(createdAt);
  return (
    <article className="max-w-sm overflow-hidden rounded-lg bg-gray-800">
      {images && (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={3000}>
            {images.map((image, index) => (
              <LinkOrDisabled
                key={index}
                target={`post/${postId}`}
                disabled={isPreview == true}
              >
                <Image
                  src={image}
                  alt="..."
                  width={tailwindSmPixels}
                  height={tailwindSmPixels}
                />
              </LinkOrDisabled>
            ))}
          </Carousel>
        </div>
      )}

      <div className="p-3 antialiased sm:p-4">
        {/* Top Row: size + post age */}
        <div className="flex items-baseline justify-between text-gray-300">
          <h3 className="text-sm uppercase tracking-wide">{size}</h3>
          <span className="inline-flex items-center rounded px-2 text-xs">
            <>
              <HiOutlineClock className="mr-1 h-3 w-3" />
              {createdAtTimeAgo}
            </>
          </span>
        </div>
        {/* Middle Row: title */}
        <LinkOrDisabled target={`post/${postId}`} disabled={isPreview == true}>
          <h2 className="w-64 truncate pt-1 text-xl font-bold tracking-tight">
            {title}
          </h2>
        </LinkOrDisabled>
        {/* Bottom Row: price + distance */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">£{price}</span>
          <span className="flex items-center rounded-lg text-sm font-normal text-gray-400">
            <span className="mr-1 flex-1 whitespace-nowrap">
              {distance} {distance > 1 ? "miles" : "mile"}
            </span>
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
