import { Spinner } from "flowbite-react";
import Link from "next/link";
import type { ComponentProps, FC } from "react";

export const SidebarLink = ({
  icon: Icon,
  label,
  href,
  badge,
  disabled,
  showSpinner,
}: {
  icon: FC<ComponentProps<"svg">>;
  label: string;
  href?: string;
  badge?: string;
  disabled?: boolean;
  showSpinner?: boolean;
}) => {
  const IconAndTextContent = (
    <>
      <Icon className="h-5 w-5" />
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
    </>
  );

  if (disabled) {
    return (
      <li>
        <span className="flex items-center rounded-lg p-2 text-base font-normal text-gray-500">
          {IconAndTextContent}
          {showSpinner && (
            <Spinner aria-label="Extra small spinner example" size="xs" />
          )}
        </span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href ?? label.replace(/\s/g, "").toLowerCase()}
        className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {IconAndTextContent}
        {showSpinner && (
          <Spinner aria-label="Extra small spinner example" size="xs" />
        )}
        {badge && (
          <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
};
