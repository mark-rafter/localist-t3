import type { ThemeProps } from "flowbite-react";
import { useTheme } from "flowbite-react";

export const useCustomTheme = (): ThemeProps => {
  const defaultTheme = useTheme().theme;
  return {
    theme: {
      carousel: {
        scrollContainer: {
          base: `${defaultTheme.carousel.scrollContainer.base} rounded-none`,
        },
      },
    },
  };
};
