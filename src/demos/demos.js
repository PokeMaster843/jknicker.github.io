// file imports
import Consts from "../consts.js";
import DoublePendulum from "./dp/DoublePendulum.js";
import Chomp from "./chomp/Chomp.js";

// constants used in demo page
const selectedTab = "rgba(26,0,51,1)";
const dpBlurb = "This is the double pendulum simulation I have programmed. Click on the canvas to pause it!";
const chompBlurb = "This is the chomp demo I have programmed. Select various A.I. difficulty levels to test your skills against!";
const thirdBlurb = "This is the third demo!";

// variables used for running interval
var demoObj = null;
var interval = null;
var intervalFn = null;
// keeps track of checked state for custom checkbox
var checked = false;
// user's mouse position, limited to the canvas
var userX = Infinity;
var userY = Infinity;
// keeps track of currently loaded demo
var curDemo = "home";

// resets all tabs to nofill and clears running interval
function resetTabs() {
	
	// reset background color of demo tabs, and hide all demo content
	let demos = document.getElementsByClassName("demo");
	let demoDivs = document.getElementsByClassName("demoDiv");
	for(let i = 0; i < demos.length; i++) {
		demos[i].style.backgroundColor = "rgba(0,0,0,0)";
		demoDivs[i].style.display = "none";
	}

	// if interval exists, clear it and the interval function
	if(interval !== null) {
		
		clearInterval(interval);
		interval = null;
		intervalFn = null;

		// clear turnText so that nothing displays when switching back to chomp demo
		document.getElementById("turnText").innerText = "";

	}

}

// set up new interval for demo
function setupInterval() {

	// if currently running interval, clear it
	if(interval !== null) {
		clearInterval(interval);
	}

	// instantiate new interval
	interval = setInterval(intervalFn, 1000 * Consts.TIME);

}

// apply any changes to constants the user made
function _changeScales() {
	
	// update SCALE and TIME constants
	Consts.SCALE = document.getElementById("drawScale").value;
	Consts.TIME = 1 / document.getElementById("timeScale").value;
	
	// clear current interval and restart it with new time step if it exists
	if(intervalFn !== null) {
		
		clearInterval(interval);
		interval = setInterval(intervalFn, 1000 * Consts.TIME);

	}

}

// when a tab is clicked on, highlight it and load resources to be used
function _selectTab(e) {
	
	// reset tabs before handling tab selection
	resetTabs();

	// change selected tab's background color, and display the demo's content
	document.getElementById(e).style.backgroundColor = selectedTab;
	document.getElementById(e + "Demo").style.display = "inline-block";

	// position the canvas properly
	document.getElementById("cnv").style.top = "1vmin";
	document.getElementById("cnv").style.display = "none";

	// hide turnText used by chomp demo
	document.getElementById("turnText").style.display = "none";

	// load proper demo blurb into variable
	let blurb;
	if(e === "dp") {
		blurb = dpBlurb;
	}

	else if(e === "chomp") {
		
		blurb = chompBlurb;
		// for chomp demo alone, display the turnText element
		document.getElementById("turnText").style.display = "block";
		// reposition the canvas to be below the turnText element
		document.getElementById("cnv").style.top = "24pt";

	}

	else if(e === "third") {
		blurb = thirdBlurb;
	}

	// change demo blurb
	document.getElementById("textBlurb").innerText = blurb;
	// update curDemo to reference loaded tab
	curDemo = e;

}

// start a new double pendulum simulation
function _newDP() {

	// change scales if they have been modified
	_changeScales();

	// set up canvas for demo
	let cnv = document.getElementById("cnv");
	cnv.style.display = "block";
	cnv.width = Consts.W;
	cnv.height = Consts.H;
	// create double pendulum object from input elements
	demoObj = new DoublePendulum(parseFloat(document.getElementById("l1").value),
								parseFloat(document.getElementById("l2").value),
								parseFloat(document.getElementById("m1").value),
								parseFloat(document.getElementById("m2").value),
								parseFloat(document.getElementById("t1").value),
								parseFloat(document.getElementById("t2").value),
								cnv.getContext("2d"));
	
	// define interval function
	intervalFn = function() {
		demoObj.render();
	};

	// set up interval
	setupInterval();

}

// start a new game of chomp
function _newChomp() {

	// change scales if they have been modified
	_changeScales();

	let cnv = document.getElementById("cnv");
	let diff = document.getElementById("aiDiff");

	// create chomp game object from input elements
	demoObj = new Chomp(parseInt(document.getElementById("rows").value),
						parseInt(document.getElementById("cols").value),
						!document.getElementById("aiFirst").checked,
						parseInt(diff.options[diff.selectedIndex].id),
						cnv.getContext("2d"));

	// set up canvas for demo
	cnv.style.display = "block";
	cnv.width = Consts.SCALE * demoObj.cols;
	cnv.height = Consts.SCALE * demoObj.rows;
	
	// define interval function
	intervalFn = function() {
		demoObj.draw(Math.floor(userY / Consts.SCALE), Math.floor(userX / Consts.SCALE));
	};

	// set up interval
	setupInterval();

}

// track mouse position while within canvas bounds
function _trackMouse(e) {

	userX = e.offsetX;
	userY = e.offsetY;

}

// forget mouse position when mouse exits canvas bounds
function _exitCanvas() {

	userX = Infinity;
	userY = Infinity;

}

// handle click events within canvas bounds based on currently running demo
function _clickFn() {

	// if current demo is double pendulum demo, pause/unpause simulation on click
	if(curDemo === "dp") {

		if(intervalFn !== null) {

			if(interval !== null) {
				clearInterval(interval);
				interval = null;
			}

			else {
				interval = setInterval(intervalFn, 1000 * Consts.TIME);
			}

		}

	}

	// if current demo is chomp demo, use current mouse selection to select user's move
	else if(curDemo === "chomp") {
		
		if(demoObj.playersTurn && !demoObj.gameOver) {

			demoObj.bite(Math.floor(userY / Consts.SCALE), Math.floor(userX / Consts.SCALE));
			setTimeout(function() {
				demoObj.bite();
			}, 3000);

		}

	}

}

// toggle custom checkbox
function _toggleCheck() {

	// flip checked state
	checked = !checked;
	// update fill color
	if(!checked) {
		// mouse is still hovering over checkbox, so reset to hover background color
		document.getElementById("aiFirst").style.backgroundColor = "#3c4777";
	}

	else {
		document.getElementById("aiFirst").style.backgroundColor = "#111422";
	}

}

// highlight checkbox on mouseover when not checked
function _hoverIn() {

	if(!checked) {
		document.getElementById("aiFirst").style.backgroundColor = "#3c4777";
	}

}

// unhighlight checkbox when not mouseover
function _hoverOut() {

	if(!checked) {
		document.getElementById("aiFirst").style.backgroundColor = "#4d5b99";
	}

	else {
		document.getElementById("aiFirst").style.backgroundColor = "#111422";	
	}

}

// export object
const Demos = {

	_selectTab,
	
	_changeScales,
	
	_newDP,
	_newChomp,
	
	_trackMouse,
	_exitCanvas,
	
	_clickFn,

	_toggleCheck,
	_hoverIn,
	_hoverOut

};

// export methods for use in Demos.vue
export default Demos;