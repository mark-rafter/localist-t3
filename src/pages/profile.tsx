import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import Image from "next/image";

interface Profile {
  name: string;
}

const Profile: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Your Profile | Localist</title>
        <meta
          name="description"
          content="Localist - the free small advertising app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{data?.user.id}</div>
      <div>{data?.user.name}</div>
      <div>{data?.user.email}</div>
      <div>{data?.user.image}</div>
      {data?.user.image && (
        <Image
          src={data?.user.image}
          width={250}
          height={250}
          alt="Profile picture"
        />
      )}
    </>
  );
};

export default Profile;