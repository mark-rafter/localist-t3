import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";
import type { IconType } from "react-icons";

function ButtonContainer({
  href,
  children,
}: React.PropsWithChildren<{ href?: string }>) {
  return href ? <Link href={href}>{children}</Link> : <>{children}</>;
}

export function HomePageLink({
  gradientDuoTone,
  icon: Icon,
  disabled,
  children,
  href,
  onClick,
}: React.PropsWithChildren<{
  gradientDuoTone: string;
  icon: IconType;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}>) {
  return (
    <li>
      <ButtonContainer href={href}>
        <Button
          className="inline-flex w-64"
          outline={true}
          gradientDuoTone={gradientDuoTone}
          onClick={onClick}
          disabled={disabled}
        >
          <div className="flex justify-center text-lg sm:text-base">
            <Icon className="mr-2 h-6 w-6" />
            {children}
          </div>
        </Button>
      </ButtonContainer>
    </li>
  );
}
