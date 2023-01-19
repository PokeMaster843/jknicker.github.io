// toggle visibility of langDetails element
function _toggleVisible(id) {
	let e = document.getElementById(id);
	e.style.display = e.style.display !== "block" ? "block" : "none";
}

// export object
const Experience = {
	_toggleVisible
};
// export functions
export default Experience;