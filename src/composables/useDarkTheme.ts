import { useDark, useToggle } from "@vueuse/core";

export const useDarkTheme = () => {
  const isDark = useDark();
  const toggleTheme = useToggle(isDark);

  return { isDark, toggleTheme };
};
