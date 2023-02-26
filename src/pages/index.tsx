import { Button } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { HiOutlineHome, HiOutlinePencilSquare } from "react-icons/hi2";

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
              <p className="mb-2 font-light text-gray-400 md:text-lg">
                Localist is a free listing board, get started by browsing the
                feed or posting your listing.
              </p>
              <Link href="/feed" className="my-3 mr-3 inline-flex">
                <Button size="lg" outline={true} gradientDuoTone="purpleToBlue">
                  <div className="flex">
                    <HiOutlineHome className="mr-2 h-6 w-6" />
                    Browse the feed
                  </div>
                </Button>
              </Link>
              <Link href="/newpost" className="mr-3 inline-flex">
                <Button size="lg" outline={true} gradientDuoTone="greenToBlue">
                  <div className="flex">
                    <HiOutlinePencilSquare className="mr-2 h-6 w-6" />
                    Post an item
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
