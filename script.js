const $ = (id) => { return document.getElementById(id); };
const listen = (node, eventType, func) => { node.addEventListener(eventType, func); };

function main() {
	// liquidate js behavior
	addDarkModeToggle();

	console.log("finished loading");
}


function addDarkModeToggle() {
	// applies .dark to <html> root element -> toggles dark mode from tailwind emitted css
	const root = $("html");

	listen(root, "keydown", (event) => {
		if (event.key === "d") {
			root.classList.toggle("dark");
		}
	});
}


// entry
main();

