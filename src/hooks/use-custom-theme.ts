import type { ThemeProps } from "flowbite-react";
import { useTheme } from "flowbite-react";

export function useCustomTheme(): ThemeProps {
  const { theme: defaultTheme } = useTheme();
  return {
    theme: {
      carousel: {
        scrollContainer: {
          base: `${defaultTheme.carousel.scrollContainer.base} rounded-none`,
        },
      },
    },
  };
}
