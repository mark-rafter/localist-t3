import { LinkOrDisabled } from "@/components/link-or-disabled";
import type { NavLink } from "@/components/nav/nav-link";
import { useRouter } from "next/router";

const Badge = ({ text }: { text: string }) => (
  <span className="absolute right-4 top-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-900 p-3 text-sm font-medium text-blue-300">
    {text}
  </span>
);

type BottomNavLinkProps = NavLink & {
  pos?: "start" | "end";
};

export function BottomNavLink({
  icon: Icon,
  label,
  pos,
  disabled,
  filledIcon: FilledIcon,
  href,
  badge,
}: BottomNavLinkProps) {
  const { asPath } = useRouter();
  const target = href ?? "/" + label.replace(/\s/g, "").toLowerCase();
  const isActiveLink = asPath === target;

  const roundedClass =
    pos === "start" ? "rounded-l-full" : pos === "end" ? "rounded-r-full" : "";

  return (
    <button
      type="button"
      className={`relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-800 ${roundedClass}`}
    >
      <LinkOrDisabled disabled={disabled === true} target={target}>
        {isActiveLink && FilledIcon ? (
          <FilledIcon className="h-6 w-6" />
        ) : (
          <Icon className="h-6 w-6" />
        )}
        <span className="sr-only">{label}</span>
      </LinkOrDisabled>
      {badge && <Badge text={badge} />}
    </button>
  );
}
