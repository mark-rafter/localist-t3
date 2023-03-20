import classNames from "classnames";
import Link from "next/link";
import React from "react";

type LinkOrDisabledClasses = {
  base?: string;
  disabledOnly?: string;
  enabledOnly?: string;
};

type LinkOrDisabledProps = {
  classes?: LinkOrDisabledClasses;
  disabled: boolean;
  target: string;
  children: React.ReactNode;
  prefetch?: boolean;
};

export function LinkOrDisabled({
  classes = {},
  disabled,
  target,
  children,
  prefetch = false,
}: LinkOrDisabledProps) {
  const { base, disabledOnly, enabledOnly } = classes;
  if (disabled) {
    if (disabledOnly) {
      return (
        <span className={base ? classNames(base, disabledOnly) : undefined}>
          {children}
        </span>
      );
    }
    return <>{children}</>;
  }
  return (
    <Link
      href={target}
      prefetch={prefetch}
      className={base ? classNames(base, enabledOnly) : undefined}
    >
      {children}
    </Link>
  );
}
