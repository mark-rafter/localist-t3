import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ComponentProps, FC } from "react";

const Badge = ({ text }: { text: string }) => (
  <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-900 p-3 text-sm font-medium text-blue-300">
    {text}
  </span>
);

function LinkOrDisabled({
  disabled,
  target,
  children,
}: {
  disabled: boolean;
  target: string;
  children?: React.ReactNode;
}) {
  const baseClasses = "flex items-center rounded-lg p-2 text-base font-normal";
  if (disabled) {
    return <span className={`${baseClasses} text-gray-500`}>{children}</span>;
  }

  return (
    <Link href={target} className={`${baseClasses} hover:bg-gray-700`}>
      {children}
    </Link>
  );
}

type StartsWithSlash = `/${string}`;

type SidebarLinkProps = {
  icon: FC<ComponentProps<"svg">>;
  label: string;
  filledIcon?: FC<ComponentProps<"svg">>;
  href?: StartsWithSlash;
  badge?: string;
  disabled?: boolean;
  showSpinner?: boolean;
};

export function SidebarLink({
  icon: Icon,
  label,
  disabled,
  filledIcon: FilledIcon,
  showSpinner,
  href,
  badge,
}: SidebarLinkProps) {
  const { asPath } = useRouter();
  const target = href ?? "/" + label.replace(/\s/g, "").toLowerCase();
  const isActiveLink = asPath === target;

  return (
    <li>
      <LinkOrDisabled disabled={disabled === true} target={target}>
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
