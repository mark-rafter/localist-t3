import Image from "next/image";
import React from "react";
import Link from "next/link";
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2";

const LinkOrDisabled = ({
  disabled,
  target,
  children,
}: {
  disabled: boolean;
  target: string;
  children?: React.ReactNode;
}) => {
  if (disabled) {
    return <>{children}</>;
  }
  return (
    <Link href={target} prefetch={false}>
      {children}
    </Link>
  );
};

type FeedItemProps = {
  postId: number;
  distance: number;
  price: number;
  size: "XS" | "small" | "medium" | "large" | "XL" | "XXL";
  isPreview?: boolean;
};

export const FeedItem = ({
  postId,
  distance,
  price,
  size,
  isPreview,
}: FeedItemProps) => {
  const tailwindSmPixels = 384;
  return (
    <article className="max-w-sm overflow-hidden rounded-lg">
      <LinkOrDisabled target={`post/${postId}`} disabled={isPreview == true}>
        <Image
          className="rounded-t-lg"
          width={tailwindSmPixels}
          height={tailwindSmPixels}
          src="/tshirt-474px.jpg"
          alt=""
        />
      </LinkOrDisabled>
      <div className="bg-white p-3 antialiased dark:bg-gray-800 sm:p-4">
        <div className="flex items-baseline justify-between text-gray-700 dark:text-gray-300">
          <h3 className="text-sm uppercase tracking-wide">{size}</h3>
          <span className="inline-flex items-center rounded px-2 text-xs">
            <HiOutlineClock className="mr-1 h-3 w-3" />2 min.
          </span>
        </div>
        <LinkOrDisabled target={`post/${postId}`} disabled={isPreview == true}>
          <h2 className="w-64 truncate pt-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Unisex plain purple nylon tee, 3 years old
          </h2>
        </LinkOrDisabled>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            £{price}
          </span>
          <span className="flex items-center rounded-lg text-sm font-normal text-gray-400">
            <span className="flex-1 whitespace-nowrap">{distance} miles</span>
            <HiOutlineMapPin className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
};

export const PreviewFeedItem = (props: Omit<FeedItemProps, "isPreview">) => {
  return <FeedItem {...props} />;
};
