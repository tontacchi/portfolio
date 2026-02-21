const $ = (id) => { return document.getElementById(id); };
const $$ = (query) => { return document.querySelector(query); };
const $$$ = (query) => { return document.querySelectorAll(query); }
const listen = (node, eventType, func) => { node.addEventListener(eventType, func); };

function main() {
	// liquidate js behavior
	addDarkModeToggles();

	console.log("finished loading");
}


function addDarkModeToggles() {
	// applies .dark to <html> root element -> toggles dark mode from tailwind emitted css
	const root   = document.documentElement;
	const toggle = $("theme-toggle");
	const icon   = $$("i");

	// check for saved theme preferences or prefer-color-scheme
	const savedTheme  = localStorage.getItem('theme');
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// apply theme based on saved preference or system preference
	if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
		root.classList.add("dark");
		icon.classList.replace("fa-moon", "fa-sun");

		$$("meta[name=\"theme-color\"]").setAttribute("content", "#000000");
	}

	listen(root, "keydown", (event) => {
		// early returns
		if (event.key !== "d") { return; }
		const active = document.activeElement;
		if (active && (
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)) { return; }

		// update icon
		if (root.classList.contains('dark')) {
			icon.classList.replace("fa-sun", "fa-moon");
			localStorage.setItem("theme", "light");
			$$("meta[name=\"theme-color\"]").setAttribute("content", "#000000");
		} else {
			icon.classList.replace("fa-moon", "fa-sun");
			localStorage.setItem("theme", "dark");
			$$("meta[name=\"theme-color\"]").setAttribute("content", "#0070f3");
		}

		root.classList.toggle("dark");
		console.log("[ DEBUG ] toggled dark mode via keyboard");

	});
	listen(toggle, "click", (event) => {
		// update icon
		if (root.classList.contains('dark')) {
			icon.classList.replace("fa-moon", "fa-sun");
			localStorage.setItem("theme", "dark");
			$$("meta[name=\"theme-color\"]").setAttribute("content", "#000000");
		} else {
			icon.classList.replace("fa-moon", "fa-sun");
			localStorage.setItem("theme", "light");
			$$("meta[name=\"theme-color\"]").setAttribute("content", "#0070f3");
		}

		root.classList.toggle("dark");
		console.log("[ DEBUG ] toggled dark mode via moon");
	});
}

// entry
main();

