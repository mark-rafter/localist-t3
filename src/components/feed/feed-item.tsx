import { LinkOrDisabled } from "@/components/link-or-disabled";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import type { ItemSizeType } from "prisma/generated/zod/inputTypeSchemas/ItemSizeSchema";
import React from "react";
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";

type DraftFeedItem = {
  title: string;
  size: ItemSizeType;
  price: number;
  images?: string[];
};

type FeedItemProps = DraftFeedItem & {
  id: number;
  distance: string;
  postAge: string;
  isPreview?: boolean;
};

type ImageCarouselProps = Pick<
  FeedItemProps,
  "id" | "images" | "title" | "isPreview"
>;

function ImagesContainer({
  imageLength,
  children,
}: React.PropsWithChildren<{ imageLength: number }>) {
  return imageLength == 1 ? (
    <>{children}</>
  ) : (
    <Carousel slideInterval={3000}>{children}</Carousel>
  );
}

function ImageCarousel({ id, title, images, isPreview }: ImageCarouselProps) {
  const smPixels = 384;

  if (!images) return <></>;

  return (
    <div>
      <ImagesContainer imageLength={images.length}>
        {images.map((image, index) => (
          <LinkOrDisabled
            key={index}
            target={`post/${id}`}
            disabled={isPreview == true}
          >
            <Image
              src={image}
              alt={`${title} Image ${index + 1}`}
              width={smPixels}
              height={smPixels}
            />
          </LinkOrDisabled>
        ))}
      </ImagesContainer>
    </div>
  );
}

export function FeedItem({
  id,
  title,
  price,
  size,
  images,
  distance,
  postAge,
  isPreview = false,
}: FeedItemProps) {
  return (
    <article className="max-w-sm overflow-hidden rounded-lg bg-gray-800">
      <ImageCarousel {...{ id, title, images, isPreview }} />
      <div className="p-3 antialiased sm:p-4">
        {/* Top Row: size + post age */}
        <div className="flex items-baseline justify-between text-gray-300">
          <h3 className="text-sm uppercase tracking-wide">{size}</h3>
          <span className="inline-flex items-center px-1 text-xs">
            <span className="mr-1 flex-1 whitespace-nowrap">{postAge}</span>
            <HiOutlineClock className="h-3 w-3" />
          </span>
        </div>
        {/* Middle Row: title */}
        <LinkOrDisabled target={`post/${id}`} disabled={isPreview == true}>
          <h2 className="w-64 truncate pt-1 text-xl font-bold tracking-tight">
            {title}
          </h2>
        </LinkOrDisabled>
        {/* Bottom Row: price + distance */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">£{price}</span>
          <span className="flex items-center text-sm font-normal text-gray-400">
            {distance.length > 0 ? (
              <span className="flex-1 whitespace-nowrap">{distance}</span>
            ) : (
              <div
                role="status"
                className="h-2.5 shadow animate-pulse bg-gray-300 rounded-full dark:bg-gray-700 w-24"
              />
            )}
            <HiOutlineMapPin className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function DraftFeedItem(props: DraftFeedItem) {
  return <FeedItem id={0} distance="X miles" postAge="X days ago" {...props} />;
}
