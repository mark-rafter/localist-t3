import { LinkOrDisabled, SkeletonOrChildren } from "@/components";
import { FeedImageCarousel } from "@/components/feed/feed-image-carousel";
import type { ItemSizeType } from "prisma/generated/zod/inputTypeSchemas/ItemSizeSchema";
import {
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlinePhoto,
} from "react-icons/hi2";

type DraftFeedItem = {
  title: string;
  size: ItemSizeType;
  price: number;
  images?: string[];
};

export type FeedItemProps = DraftFeedItem & {
  id: number;
  distance: string;
  postAge: string;
  isPreview?: boolean;
};

export function DraftFeedItem(props: DraftFeedItem) {
  return (
    <FeedItem
      id={0}
      distance="X miles"
      postAge="X days ago"
      isPreview={true}
      {...props}
    />
  );
}

export function SkeletonFeedItem() {
  return (
    <article
      role="status"
      className="max-w-sm animate-pulse overflow-hidden rounded-lg bg-gray-800 shadow"
    >
      <div className="flex h-96 w-96 items-center justify-center rounded bg-gray-700">
        <HiOutlinePhoto className="h-12 w-12" />
      </div>
      <div className="p-3 antialiased sm:p-4">
        {/* Top Row: size + post age */}
        <div className="flex items-baseline justify-between text-gray-300">
          <div className="mt-1 h-4 w-20 rounded-full bg-gray-700" />
          <span className="inline-flex items-center px-1 text-xs">
            <div className="mr-1 h-2.5 w-20 rounded-full bg-gray-700" />
            <HiOutlineClock className="h-3 w-3" />
          </span>
        </div>
        {/* Middle Row: title */}
        <div className="mt-2 h-5 w-48 rounded-full bg-gray-700" />
        {/* Bottom Row: price + distance */}
        <div className="flex items-center justify-between">
          <div className="mt-2 h-4 w-16 rounded-full bg-gray-700" />
          <span className="flex items-center text-sm font-normal text-gray-400">
            <div className="h-2.5 w-16 rounded-full bg-gray-700" />
            <HiOutlineMapPin className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
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
      <FeedImageCarousel {...{ id, title, images, isPreview }} />
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
        <LinkOrDisabled
          target={`post/${id}`}
          disabled={isPreview == true}
          prefetch={false}
        >
          <h2 className="w-64 truncate pt-1 text-xl font-bold tracking-tight">
            {title}
          </h2>
        </LinkOrDisabled>
        {/* Bottom Row: price + distance */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">£{price}</span>
          <span className="flex items-center text-sm font-normal text-gray-400">
            <SkeletonOrChildren showSkeleton={distance.length < 1}>
              <span className="flex-1 whitespace-nowrap">{distance}</span>
            </SkeletonOrChildren>
            <HiOutlineMapPin className="ml-1 h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
