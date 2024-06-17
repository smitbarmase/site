const processTheme = () => {
	const toggleThemeButton = document.getElementById("toggle-theme");

	const isDarkTheme = () => document.documentElement.classList.contains("dark");

	const updateButton = () => {
		if (toggleThemeButton) {
			toggleThemeButton.textContent = isDarkTheme()
				? "lights on"
				: "lights off";
		}
	};

	const toggleTheme = () => {
		const isDark = isDarkTheme();
		document.documentElement.classList.toggle("dark", !isDark);
		localStorage.setItem("theme", isDark ? "light" : "dark");
		updateButton();
	};

	// use button to toggle theme
	if (toggleThemeButton) toggleThemeButton.onclick = toggleTheme;

	// Use system theme by default
	const prefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	const storedTheme = localStorage.getItem("theme");
	const theme = storedTheme ? storedTheme : prefersDark ? "dark" : "light";
	document.documentElement.classList.toggle("dark", theme === "dark");
	updateButton();
};
processTheme();
