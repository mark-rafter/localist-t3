import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";

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
      <div>{data?.user.name}</div>
    </>
  );
};

export default Profile;
