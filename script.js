const $ = (id) => { return document.getElementById(id); };
const listen = (node, eventType, func) => { node.addEventListener(eventType, func); };

function main() {
	// liquidate js behavior
	addDarkModeToggles();

	console.log("finished loading");
}


function addDarkModeToggles() {
	// applies .dark to <html> root element -> toggles dark mode from tailwind emitted css
	const root = $("html");
	const moon = $("theme-toggle");

	listen(root, "keydown", (event) => {
		if (event.key !== "d") { return; }

		const active = document.activeElement;

		if (active && (
			active.tagName === "INPUT" ||
			active.tagName === "TEXTAREA" ||
			active.isContentEditable
		)) { return; }

		root.classList.toggle("dark");
		console.log("[ DEBUG ] toggled dark mode via keyboard");

	});
	listen(moon, "click", (event) => {
		root.classList.toggle("dark");
		console.log("[ DEBUG ] toggled dark mode via moon");
	});
}


// entry
main();

