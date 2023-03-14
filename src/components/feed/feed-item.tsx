import { LinkOrDisabled, SkeletonOrChildren } from "@/components";
import { FeedImageCarousel } from "@/components/feed/feed-image-carousel";
import type { ItemSizeType } from "prisma/generated/zod/inputTypeSchemas/ItemSizeSchema";
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";

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
  return <FeedItem id={0} distance="X miles" postAge="X days ago" {...props} />;
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
        <LinkOrDisabled target={`post/${id}`} disabled={isPreview == true}>
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
