import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { api } from "@/utils/api";

export default function ProfilePage() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <>
        <Head>
          <title>Your Profile | Localist</title>
        </Head>
        TODO: Loading skeleton
      </>
    );
  }

  const { user } = sessionData;

  const { data: userRating, isFetching } = api.user.getRating.useQuery(user.id);

  return (
    <>
      <Head>
        <title>Your Profile | Localist</title>
      </Head>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>Rating: {isFetching ? "TODO: Skeleton" : userRating}</div>
      <div>{user.image}</div>
      {user.image && (
        <Image
          src={user.image}
          width={250}
          height={250}
          alt="Profile picture"
        />
      )}
    </>
  );
}
