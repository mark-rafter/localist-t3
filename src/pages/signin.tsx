import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { FaGithub } from "react-icons/fa";

const providerIcons: Record<string, JSX.Element> = {
  github: <FaGithub className="mr-2 h-5 w-5" />,
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In | Localist</title>
        <meta name="description" content="Sign in to Localist" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#490141] to-[#20111e]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[5rem]">
            Localist
          </h1>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                type="button"
                onClick={() => void signIn(provider.id)}
                className="mr-2 mb-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium hover:bg-[#050708]/30 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 focus:ring-gray-500"
              >
                {providerIcons[provider.id]}
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
