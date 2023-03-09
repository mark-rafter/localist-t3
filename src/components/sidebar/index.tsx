import { SidebarLink } from "@/components/sidebar/sidebar-link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiBars3BottomLeft,
  HiBookmark,
  HiHome,
  HiInboxArrowDown,
  HiOutlineBookmark,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineInboxArrowDown,
  HiOutlinePencilSquare,
  HiOutlineUser,
  HiPencilSquare,
  HiUser,
} from "react-icons/hi2";

const BrandButton = () => (
  <Link href="/" className="mb-4 flex items-center pl-2.5">
    <Image
      src="/login-logo.png"
      width={448 / 3}
      height={112 / 3}
      alt="Localist Logo"
    />
  </Link>
);

export function Sidebar() {
  const { status: sessionStatus } = useSession();
  return (
    <>
      <button
        data-drawer-target="sidebar"
        data-drawer-toggle="sidebar"
        aria-controls="sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 md:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <HiBars3BottomLeft className="h-6 w-6 text-gray-500" />
      </button>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-screen w-56 -translate-x-full transition-transform sm:translate-x-0`}
        aria-label="Sidebar"
        aria-hidden="true"
      >
        <div className="h-full overflow-y-auto bg-gray-800 px-3 py-4 antialiased">
          <BrandButton />
          <ul className="space-y-2">
            <SidebarLink
              label="Feed"
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
          <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4">
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
                href="/"
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
}
