import Link from "next/link";
import React from "react";

type LinkOrDisabledProps = {
  disabled: boolean;
  target: string;
  children: React.ReactNode;
  prefetch?: boolean;
};

export function LinkOrDisabled({
  disabled,
  target,
  children,
  prefetch = false,
}: LinkOrDisabledProps) {
  if (disabled) {
    return <>{children}</>;
  }
  return (
    <Link href={target} prefetch={prefetch}>
      {children}
    </Link>
  );
}
