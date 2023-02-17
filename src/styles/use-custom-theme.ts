import type { ThemeProps } from "flowbite-react";
import { useTheme } from "flowbite-react";

export default function useCustomTheme(): ThemeProps {
  const carouselScrollContainerBase =
    useTheme().theme.carousel.scrollContainer.base;

  return {
    theme: {
      carousel: {
        scrollContainer: {
          base: `${carouselScrollContainerBase} rounded-none`,
        },
      },
    },
  };
}
