import { BottomNavLink } from "@/components/bottom-nav/bottom-nav-link";
import { useSession } from "next-auth/react";
import {
  HiHeart,
  HiHome,
  HiInboxArrowDown,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineInboxArrowDown,
  HiOutlinePencilSquare,
  HiOutlineUser,
  HiPencilSquare,
  HiUser,
} from "react-icons/hi2";

export function BottomNav() {
  const { status: sessionStatus } = useSession();
  if (sessionStatus !== "authenticated") {
    return <></>;
  }
  return (
    <div className="fixed bottom-4 left-1/2 z-50 h-16 w-full max-w-lg -translate-x-1/2 rounded-full border border-gray-600 bg-gray-800 sm:hidden">
      <div className="grid h-full grid-cols-5">
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
          badge="3"
        />
        <BottomNavLink
          icon={HiOutlinePencilSquare}
          filledIcon={HiPencilSquare}
          label="New Post"
        />
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
