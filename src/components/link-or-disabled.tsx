import React from "react";
import Link from "next/link";

type LinkOrDisabledProps = {
  disabled: boolean;
  target: string;
  children: React.ReactNode;
  prefetch?: boolean;
};

export const LinkOrDisabled = ({
  disabled,
  target,
  children,
  prefetch = false,
}: LinkOrDisabledProps) => {
  if (disabled) {
    return <>{children}</>;
  }
  return (
    <Link href={target} prefetch={prefetch}>
      {children}
    </Link>
  );
};
