import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiBars3BottomLeft,
  HiOutlineHome,
  HiOutlinePencilSquare,
  HiOutlineInboxArrowDown,
  HiOutlineBookmark,
  HiOutlineCog6Tooth,
  HiOutlineUser,
  HiHome,
  HiPencilSquare,
  HiInboxArrowDown,
  HiBookmark,
  HiUser,
} from "react-icons/hi2";
import React from "react";
import Link from "next/link";
import { SidebarLink } from "@/components/sidebar/sidebar-link";
import { useSession } from "next-auth/react";
import Image from "next/image";

const BrandButton = (
  <Link href="/" className="mb-5 flex items-center pl-2.5">
    <Image
      src="https://flowbite.com/docs/images/logo.svg"
      width={32}
      height={32}
      className="mr-3 h-6 sm:h-7"
      alt="Localist Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Localist
    </span>
  </Link>
);

export const Sidebar = () => {
  const { status: sessionStatus } = useSession();
  return (
    <>
      <button
        data-drawer-target="sidebar"
        data-drawer-toggle="sidebar"
        aria-controls="sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3BottomLeft className="h-6 w-6 text-gray-500" />
      </button>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen w-56 -translate-x-full transition-transform sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 antialiased dark:bg-gray-800">
          {BrandButton}
          <ul className="space-y-2">
            <SidebarLink
              label="Feed"
              href="/"
              icon={HiOutlineHome}
              filledIcon={HiHome}
            />
            <SidebarLink
              label="New Post"
              disabled={sessionStatus !== "authenticated"}
              icon={HiOutlinePencilSquare}
              filledIcon={HiPencilSquare}
            />
            <SidebarLink
              label="Messages"
              disabled={sessionStatus !== "authenticated"}
              icon={HiOutlineInboxArrowDown}
              filledIcon={HiInboxArrowDown}
              badge="3"
            />
            <SidebarLink
              label="Bookmarks"
              disabled={sessionStatus !== "authenticated"}
              icon={HiOutlineBookmark}
              filledIcon={HiBookmark}
            />
            <SidebarLink label="Settings" icon={HiOutlineCog6Tooth} />
            <SidebarLink
              label="Test Link"
              disabled={true}
              showSpinner={true}
              badge="69"
              icon={HiUser}
            />
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
            {sessionStatus === "authenticated" ? (
              <>
                <SidebarLink
                  label="Profile"
                  icon={HiOutlineUser}
                  filledIcon={HiUser}
                />
                <SidebarLink
                  label="Sign Out"
                  href="/api/auth/signout"
                  icon={HiArrowRightOnRectangle}
                />
              </>
            ) : (
              <SidebarLink
                label="Sign In"
                disabled={sessionStatus === "loading"}
                showSpinner={sessionStatus === "loading"}
                icon={HiArrowLeftOnRectangle}
              />
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};
