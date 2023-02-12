import {
  Bars3BottomLeftIcon,
  HomeIcon,
  PencilSquareIcon,
  InboxArrowDownIcon,
  BookmarkIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC, ComponentProps } from "react";

const BrandButton = (
  <Link href="/" className="mb-5 flex items-center pl-2.5">
    <img
      src="https://flowbite.com/docs/images/logo.svg"
      className="mr-3 h-6 sm:h-7"
      alt="Localist Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Localist
    </span>
  </Link>
);

const OpenSidebarButton = ({ sidebarId }: { sidebarId: string }) => (
  <button
    data-drawer-target={sidebarId}
    data-drawer-toggle={sidebarId}
    aria-controls={sidebarId}
    type="button"
    className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
  >
    <span className="sr-only">Open sidebar</span>
    <Bars3BottomLeftIcon className="h-6 h-6 text-gray-500" />
  </button>
);

const SidebarLink = ({
  icon: Icon,
  label,
  href,
  badge,
}: {
  icon: FC<ComponentProps<"svg">>;
  label: string;
  href?: string;
  badge?: string;
}) => (
  <li>
    <Link
      href={href ?? label.replace(/\s/g, "").toLowerCase()}
      className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    >
      <Icon className="h-6" />
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
      {badge && (
        <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {badge}
        </span>
      )}
    </Link>
  </li>
);

export const Sidebar = () => (
  <>
    <OpenSidebarButton sidebarId="sidebar" />
    <aside
      id="sidebar"
      className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        {BrandButton}
        <ul className="space-y-2">
          <SidebarLink label="Feed" href="/" icon={HomeIcon} />
          <SidebarLink label="New Post" icon={PencilSquareIcon} />
          <SidebarLink label="Messages" icon={InboxArrowDownIcon} badge="3" />
          <SidebarLink label="Bookmarks" icon={BookmarkIcon} />
          <SidebarLink label="Settings" icon={Cog6ToothIcon} />
        </ul>
        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
          <SidebarLink label="Sign Out" icon={ArrowLeftOnRectangleIcon} />
        </ul>
      </div>
    </aside>
  </>
);
