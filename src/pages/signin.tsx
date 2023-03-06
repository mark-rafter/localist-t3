import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { FaGithub, FaSpotify } from "react-icons/fa";

type ProviderStyle = { icon: JSX.Element; class: string };

const providerStyles: Record<string, ProviderStyle> = {
  github: {
    icon: <FaGithub className="mr-2 h-5 w-5" />,
    class:
      "bg-[#24292F] hover:bg-[#050708]/30 focus:ring-[#24292F]/50 focus:ring-gray-500",
  },
  spotify: {
    icon: <FaSpotify className="mr-2 h-5 w-5" />,
    class:
      "bg-[#1d9a49] hover:bg-[#050708]/30 focus:ring-[#1d9a49]/50 focus:ring-gray-500",
  },
};

export default function SignInPage({
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
          <div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className={`mr-2 mb-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 ${
                    providerStyles[provider.id]?.class ?? ""
                  }`}
                >
                  {providerStyles[provider.id]?.icon}
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
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
