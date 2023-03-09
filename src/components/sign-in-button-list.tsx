import type { ClientSafeProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
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

export default function SignInButtonList({
  providers,
}: {
  providers: ClientSafeProvider[];
}) {
  const { status: sessionStatus } = useSession();

  return (
    <ul className="mt-5 flex flex-col items-center">
      {providers.map((provider) => (
        <li key={provider.name}>
          <button
            type="button"
            disabled={sessionStatus === "loading"}
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
        </li>
      ))}
    </ul>
  );
}
