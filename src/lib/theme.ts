import { cookies } from "next/headers";

export type Theme = "light" | "dark" | "system";

const THEME_COOKIE = "theme";

export async function getServerTheme(): Promise<"light" | "dark"> {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE)?.value;

  if (theme === "dark" || theme === "light") {
    return theme;
  }

  // Default to light if no cookie (system preference handled on client)
  return "light";
}

export function getThemeScript() {
  // This script syncs localStorage to cookie and updates the DOM
  // Runs before React hydrates to prevent flash
  return `
    (function() {
      function setTheme(theme) {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        document.documentElement.style.colorScheme = theme;
        document.cookie = 'theme=' + theme + ';path=/;max-age=31536000';
      }

      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = stored === 'dark' || stored === 'light'
        ? stored
        : (prefersDark ? 'dark' : 'light');

      setTheme(resolved);

      // Sync future changes to cookie
      window.__setTheme = setTheme;
    })();
  `;
}
