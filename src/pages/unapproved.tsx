import Head from "next/head";

export default function UnapprovedPostPage() {
  return (
    <>
      <Head>
        <title>Unapproved Post | Localist</title>
      </Head>
      <h1 className="#text-3xl">This post is pending approval</h1>
    </>
  );
}
