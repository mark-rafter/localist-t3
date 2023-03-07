import { Button } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

function HomePageLink({
  gradientDuoTone,
  icon: Icon,
  disabled,
  children,
  href,
  onClick,
}: React.PropsWithChildren<{
  gradientDuoTone: string;
  icon: IconType;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}>) {
  const ButtonContainer = ({ children }: React.PropsWithChildren) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;

  return (
    <ButtonContainer>
      <Button
        className="mr-3 mb-3 inline-flex"
        outline={true}
        gradientDuoTone={gradientDuoTone}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="flex text-lg sm:text-base">
          <Icon className="mr-2 h-6 w-6" />
          {children}
        </div>
      </Button>
    </ButtonContainer>
  );
}

export default function HomePage() {
  const [geolocation, setGeolocation] = useState<Geolocation | undefined>(
    undefined
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeolocation(navigator.geolocation);
    }
  }, []);

  const setLocation = () => {
    geolocation?.getCurrentPosition((position) => {
      console.log("latitude", position.coords.latitude);
      console.log("longitude", position.coords.longitude);
    });
  };

  return (
    <>
      <Head>
        <title>Home | Localist</title>
      </Head>
      <section className="container mx-auto max-w-md px-4 py-8 text-center">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-6xl">
          Welcome to Localist!
        </h1>
        <p className="mb-2 font-light text-gray-300 md:text-lg">
          Localist is a free listing board, get started by browsing the feed or
          posting your listing.
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
          disabled={!geolocation}
          onClick={setLocation}
          gradientDuoTone="pinkToOrange"
          icon={HiOutlineMapPin}
        >
          Set your location
        </HomePageLink>
      </section>
    </>
  );
}
