import { LinkOrDisabled } from "@/components/link-or-disabled";
import type { NavLink } from "@/components/nav/nav-link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  HiHeart,
  HiHome,
  HiInboxArrowDown,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineInboxArrowDown,
  HiOutlinePencilSquare,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi2";

type BottomNavLinkProps = NavLink & {
  pos?: "start" | "end";
};

export function BottomNavLink({
  icon: Icon,
  label,
  pos,
  disabled,
  filledIcon: FilledIcon,
  href,
  badge,
}: BottomNavLinkProps) {
  const { asPath } = useRouter();
  const target = href ?? "/" + label.replace(/\s/g, "").toLowerCase();
  const isActiveLink = asPath === target;

  const roundedClass =
    pos === "start" ? "rounded-l-full" : pos === "end" ? "rounded-r-full" : "";

  return (
    <button
      type="button"
      className={`group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 ${roundedClass}`}
    >
      <LinkOrDisabled disabled={disabled === true} target={target}>
        {isActiveLink && FilledIcon ? (
          <FilledIcon className="h-6 w-6" />
        ) : (
          <Icon className="h-6 w-6" />
        )}
        <span className="sr-only">{label}</span>
      </LinkOrDisabled>
    </button>
  );
}

export function BottomNav() {
  const { status: sessionStatus } = useSession();
  if (sessionStatus !== "authenticated") {
    return <></>;
  }
  return (
    <div className="fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-600 bg-gray-800 sm:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-5">
        <BottomNavLink
          pos="start"
          icon={HiOutlineHome}
          filledIcon={HiHome}
          label="Feed"
        />
        <BottomNavLink
          icon={HiOutlineInboxArrowDown}
          filledIcon={HiInboxArrowDown}
          label="Messages"
        />
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
          >
            <HiOutlinePencilSquare className="h-6 w-6" />
            <span className="sr-only">New Post</span>
          </button>
        </div>
        <BottomNavLink
          icon={HiOutlineHeart}
          filledIcon={HiHeart}
          label="Likes"
        />
        <BottomNavLink
          pos="end"
          icon={HiOutlineUser}
          filledIcon={HiUser}
          label="Profile"
        />
      </div>
    </div>
  );
}
