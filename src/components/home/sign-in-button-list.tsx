import type { EnabledProviderType } from "@/server/auth";
import { signIn } from "next-auth/react";
import { FaDiscord, FaGithub, FaSpotify, FaTwitch } from "react-icons/fa";

type ProviderStyle = {
  name: Capitalize<EnabledProviderType>;
  icon: JSX.Element;
  class: string;
};

const signInProviders: Record<EnabledProviderType, ProviderStyle> = {
  discord: {
    name: "Discord",
    icon: <FaDiscord className="mr-2 h-5 w-5" />,
    class: "bg-[#5865f2] hover:bg-[#050708]/30 focus:ring-[#24292F]/50",
  },
  github: {
    name: "Github",
    icon: <FaGithub className="mr-2 h-5 w-5" />,
    class: "bg-[#24292F] hover:bg-[#050708]/30 focus:ring-[#24292F]/50",
  },
  spotify: {
    name: "Spotify",
    icon: <FaSpotify className="mr-2 h-5 w-5" />,
    class: "bg-[#1d9a49] hover:bg-[#050708]/30 focus:ring-[#1d9a49]/50",
  },
  twitch: {
    name: "Twitch",
    icon: <FaTwitch className="mr-2 h-5 w-5" />,
    class: "bg-[#9146ff] hover:bg-[#050708]/30 focus:ring-[#1d9a49]/50",
  },
};

export default function SignInButtonList({ disabled }: { disabled: boolean }) {
  // todo: return credentials login form if preview environment (expose public env var "IS_PREVIEW_ENV")

  return (
    <ul className="mt-5 flex flex-col items-center">
      {Object.entries(signInProviders).map(([id, providerStyle]) => (
        <li key={id}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => signIn(id)}
            className={`mb-3 flex w-64 justify-center rounded-lg px-5 py-3 focus:outline-none focus:ring-4 focus:ring-gray-500 ${providerStyle.class}`}
          >
            <div className="inline-flex items-center sm:text-sm">
              {providerStyle.icon}
              Sign in with {providerStyle.name}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
