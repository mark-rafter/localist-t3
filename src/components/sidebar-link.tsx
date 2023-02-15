import { Spinner } from "flowbite-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";

const Badge = ({ text }: { text: string }) => (
  <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
    {text}
  </span>
);

const LinkOrSpan = ({
  disabled,
  href,
  label,
  children,
}: {
  disabled: boolean;
  href?: string;
  label: string;
  children?: React.ReactNode;
}) => {
  if (disabled) {
    return (
      <span className="flex items-center rounded-lg p-2 text-base font-normal text-gray-500">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href ?? label.replace(/\s/g, "").toLowerCase()}
      className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
    >
      {children}
    </Link>
  );
};

type SidebarLinkProps = {
  icon: FC<ComponentProps<"svg">>;
  label: string;
  href?: string;
  badge?: string;
  disabled?: boolean;
  showSpinner?: boolean;
};

export const SidebarLink = ({
  icon: Icon,
  label,
  disabled,
  showSpinner,
  href,
  badge,
}: SidebarLinkProps) => {
  return (
    <li>
      <LinkOrSpan disabled={disabled === true} href={href} label={label}>
        <Icon className="h-5 w-5" />
        <span className="ml-3 flex-1 whitespace-nowrap">
          {label}
          {showSpinner && (
            <Spinner
              className="ml-2 mb-3"
              aria-label={`Loading spinner for ${label}`}
              size="xs"
            />
          )}
        </span>
        {badge && <Badge text={badge} />}
      </LinkOrSpan>
    </li>
  );
};
