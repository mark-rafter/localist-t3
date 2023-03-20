import { LinkOrDisabled } from "@/components/link-or-disabled";
import type { NavLink } from "@/components/nav/nav-link";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";

const Badge = ({ text }: { text: string }) => (
  <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-900 p-3 text-sm font-medium text-blue-300">
    {text}
  </span>
);

export function SidebarLink({
  icon: Icon,
  label,
  disabled,
  filledIcon: FilledIcon,
  showSpinner,
  href,
  badge,
}: NavLink) {
  const { asPath } = useRouter();
  const target = href ?? "/" + label.replace(/\s/g, "").toLowerCase();
  const isActiveLink = asPath === target;

  return (
    <li>
      <LinkOrDisabled
        disabled={disabled === true}
        target={target}
        classes={{
          base: "flex items-center rounded-lg p-2 text-base font-normal",
          disabledOnly: "text-gray-500",
          enabledOnly: "hover:bg-gray-700",
        }}
      >
        {isActiveLink && FilledIcon ? (
          <FilledIcon className="h-5 w-5" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
        <span className="ml-3 flex-1 whitespace-nowrap">
          {label}
          {showSpinner && (
            <Spinner
              className="ml-2 mb-1"
              aria-label={`Loading spinner for ${label}`}
              size="xs"
            />
          )}
        </span>
        {badge && <Badge text={badge} />}
      </LinkOrDisabled>
    </li>
  );
}
