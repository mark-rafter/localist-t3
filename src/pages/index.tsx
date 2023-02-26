import { Button } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const HomePageLink = ({
  href,
  gradientDuoTone,
  icon: Icon,
  children,
}: {
  href: string;
  gradientDuoTone: string;
  icon: IconType;
} & React.PropsWithChildren) => {
  return (
    <Link href={href} className="mr-3 mb-3 inline-flex">
      <Button size="lg" outline={true} gradientDuoTone={gradientDuoTone}>
        <div className="flex">
          <Icon className="mr-2 h-6 w-6" />
          {children}
        </div>
      </Button>
    </Link>
  );
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home | Localist</title>
      </Head>
      <div className="container mx-auto max-w-md text-center">
        <section>
          <div className="mx-auto grid px-4 py-8">
            <div className="mr-auto place-self-center">
              <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-6xl">
                Welcome to Localist!
              </h1>
              <p className="mb-2 font-light text-gray-300 md:text-lg">
                Localist is a free listing board, get started by browsing the
                feed or posting your listing.
              </p>
              <HomePageLink
                href="/feed"
                gradientDuoTone="purpleToBlue"
                icon={HiOutlineHome}
              >
                Browse the feed
              </HomePageLink>
              <HomePageLink
                href="/newpost"
                gradientDuoTone="greenToBlue"
                icon={HiOutlinePencilSquare}
              >
                Post an item
              </HomePageLink>
              <HomePageLink
                href="/settings"
                gradientDuoTone="pinkToOrange"
                icon={HiOutlineMapPin}
              >
                Set your location
              </HomePageLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
