/** Blocking theme init — must live in a Server Component, not inside next-themes' client tree. */
const themeInitScript = `
(function () {
  var root = document.documentElement;
  var storageKey = "theme";
  var defaultTheme = "dark";
  try {
    var theme = localStorage.getItem(storageKey) || defaultTheme;
    if (theme === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`.trim();

export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
