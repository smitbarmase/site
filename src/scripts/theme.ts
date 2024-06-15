const processTheme = () => {
  const body = document.body;
  const toggleThemeButton = document.getElementById("toggle-theme");
  const toggleThemeDesktopButton = document.getElementById(
    "toggle-theme-desktop",
  );

  const isDarkTheme = () => body.classList.contains("dark");

  const updateButton = () => {
    if (toggleThemeButton) {
      toggleThemeButton.textContent = isDarkTheme()
        ? "lights on"
        : "lights off";
    }
    if (toggleThemeDesktopButton) {
      toggleThemeDesktopButton.textContent = isDarkTheme()
        ? "lights on"
        : "lights off";
    }
  };

  const toggleTheme = () => {
    const isDark = isDarkTheme();
    body.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
    updateButton();
  };

  // use button to toggle theme
  if (toggleThemeButton) toggleThemeButton.onclick = toggleTheme;
  if (toggleThemeDesktopButton) toggleThemeDesktopButton.onclick = toggleTheme;

  // Use system theme by default
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = localStorage.getItem("theme");
  const theme = storedTheme ? storedTheme : prefersDark ? "dark" : "light";
  body.classList.toggle("dark", theme === "dark");
  updateButton();
};
processTheme();
