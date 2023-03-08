import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ClientSafeProvider } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { FaGithub, FaSpotify } from "react-icons/fa";

type ProviderStyle = { icon: JSX.Element; class: string };

const providerStyles = new Map<ClientSafeProvider["id"], ProviderStyle>([
  [
    "github",
    {
      icon: <FaGithub className="mr-2 h-5 w-5" />,
      class: "bg-[#24292F] hover:bg-[#050708]/30 focus:ring-[#24292F]/50",
    },
  ],
  [
    "spotify",
    {
      icon: <FaSpotify className="mr-2 h-5 w-5" />,
      class: "bg-[#1d9a49] hover:bg-[#050708]/30 focus:ring-[#1d9a49]/50",
    },
  ],
]);

export default function SignInPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign In | Localist</title>
        <meta name="description" content="Sign in to Localist" />
      </Head>
      <main className="container flex flex-col items-center md:pt-6">
        <Image
          src="/icon-512.png"
          width={512 / 2}
          height={512 / 2}
          alt="Localist Logo"
        />
        <div className="mt-5">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                type="button"
                onClick={() => signIn(provider.id)}
                className={`mb-3 flex w-64 justify-center rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-gray-500 ${
                  providerStyles.get(provider.id)?.class ?? ""
                }`}
              >
                <div className="inline-flex items-center sm:text-sm">
                  {providerStyles.get(provider.id)?.icon}
                  Sign in with {provider.name}
                </div>
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
