import type { ComponentProps, FC } from "react";

type StartsWithSlash = `/${string}`;

export type NavLink = {
  icon: FC<ComponentProps<"svg">>;
  label: string;
  filledIcon?: FC<ComponentProps<"svg">>;
  href?: StartsWithSlash;
  badge?: string;
  disabled?: boolean;
  showSpinner?: boolean;
};

// export const navLinks: NavLink[] = [
//   {
//     label: "Feed",
//     icon: HiOutlineHome,
//     filledIcon: HiHome,
//   },
//   {
//     label: "New Post",
//     icon: HiOutlineHome,
//     filledIcon: HiHome,
//   },
// ];
