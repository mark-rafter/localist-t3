import SignInButtonList from "@/components/sign-in-button-list";
import type { Coordinates } from "@/helpers/distance";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineHome,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

function ButtonContainer({
  href,
  children,
}: React.PropsWithChildren<{ href?: string }>) {
  return href ? <Link href={href}>{children}</Link> : <>{children}</>;
}

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
  return (
    <li>
      <ButtonContainer href={href}>
        <Button
          className="inline-flex w-64"
          outline={true}
          gradientDuoTone={gradientDuoTone}
          onClick={onClick}
          disabled={disabled}
        >
          <div className="flex justify-center text-lg sm:text-base">
            <Icon className="mr-2 h-6 w-6" />
            {children}
          </div>
        </Button>
      </ButtonContainer>
    </li>
  );
}

// todo: consider using FSM if state gets too messy
export default function HomePage() {
  const [geolocation, setGeolocation] = useState<Geolocation | undefined>(
    undefined
  );
  const [, setUserCoords] = useState<Coordinates>({
    lat: 51.5,
    long: 0.0,
  });
  const { status: sessionStatus } = useSession();
  const [parent] = useAutoAnimate({ duration: 100 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeolocation(navigator.geolocation);
    }
  }, []);

  const setLocation = () => {
    geolocation?.getCurrentPosition((position) => {
      console.log("latitude", position.coords.latitude);
      console.log("longitude", position.coords.longitude);
      setUserCoords({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
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
        <div ref={parent}>
          {sessionStatus !== "authenticated" && <SignInButtonList />}
          <ul className="mt-2 space-y-4 border-t border-gray-700 pt-4">
            <HomePageLink
              href="/feed"
              gradientDuoTone="purpleToBlue"
              icon={HiOutlineHome}
            >
              Browse the feed
            </HomePageLink>
            <HomePageLink
              disabled={sessionStatus !== "authenticated"}
              href="/newpost"
              gradientDuoTone="greenToBlue"
              icon={HiOutlinePencilSquare}
            >
              Post an item
            </HomePageLink>
            <HomePageLink
              // todo: if browser geolocation disabled, use custom map selector
              disabled={!geolocation}
              onClick={setLocation}
              gradientDuoTone="pinkToOrange"
              icon={HiOutlineMapPin}
            >
              Set your location
            </HomePageLink>
          </ul>
        </div>
      </section>
    </>
  );
}
