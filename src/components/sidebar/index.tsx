import { SidebarLink } from "@/components/sidebar/sidebar-link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  HiArrowLeftOnRectangle,
  HiArrowRightOnRectangle,
  HiHeart,
  HiHome,
  HiInboxArrowDown,
  HiOutlineCog6Tooth,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineInboxArrowDown,
  HiOutlinePencilSquare,
  HiOutlineSquare3Stack3D,
  HiOutlineUser,
  HiPencilSquare,
  HiSquare3Stack3D,
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
    <aside
      id="sidebar"
      className={`fixed left-0 top-0 z-40 h-screen w-56 -translate-x-full transition-transform sm:translate-x-0`}
      aria-label="Sidebar"
      aria-hidden="true"
    >
      <div className="m-2 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 px-3 py-4 antialiased">
        <BrandButton />
        <ul className="space-y-2">
          <SidebarLink label="Feed" icon={HiOutlineHome} filledIcon={HiHome} />
          <SidebarLink
            label="New Post"
            disabled={sessionStatus !== "authenticated"}
            icon={HiOutlinePencilSquare}
            filledIcon={HiPencilSquare}
          />
          <SidebarLink
            label="Messages"
            disabled={true}
            icon={HiOutlineInboxArrowDown}
            filledIcon={HiInboxArrowDown}
            badge="3"
          />
          <SidebarLink
            label="Likes"
            disabled={sessionStatus !== "authenticated"}
            icon={HiOutlineHeart}
            filledIcon={HiHeart}
          />
          {/* <SidebarLink label="Settings" icon={HiOutlineCog6Tooth} /> */}
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
                label="My Posts"
                icon={HiOutlineSquare3Stack3D}
                filledIcon={HiSquare3Stack3D}
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
  );
}
