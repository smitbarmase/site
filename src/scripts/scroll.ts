window.addEventListener("scroll", function () {
	const nav = document.querySelector("nav");
	if (nav) {
		if (window.scrollY > 0) {
			nav.classList.add("nav-shadow");
		} else {
			nav.classList.remove("nav-shadow");
		}
	}
});
