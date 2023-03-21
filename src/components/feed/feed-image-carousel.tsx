import { LinkOrDisabled } from "@/components";
import type { FeedItemProps } from "@/components/feed/feed-item";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import React from "react";

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

export function FeedImageCarousel({
  id,
  title,
  images,
  isPreview,
}: ImageCarouselProps) {
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
            prefetch={false}
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
