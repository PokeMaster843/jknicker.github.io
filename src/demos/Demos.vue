<template>
	<!--
		parent element hidden by default so that on page load, user will not see elements without styling for a brief moment
	-->
	<div id="parent" style="visibility:hidden">
		<!--
			page title container
		-->
		<div class="pageTitle">
			<h1>Code Demos</h1>
		</div>

		<!--
			page body container
		-->
		<div class="pageBody">
			
			<!--
				demo tabs container
			-->
			<div id="tabContainer">
				<ul>
					<li class="demo" id="dp" @click="_selectTab('dp')"><a>Double Pendulum</a></li>
					<li class="demo" id="chomp" @click="_selectTab('chomp')"><a>Chomp</a></li>
					<li class="demo" id="third" @click="_selectTab('third')"><a>3rd Demo</a></li>
				</ul>
			</div>

			<!--
				page content container
			-->
			<div id="contentContainer">
				
				<p style="visibility: visible; padding-top: 1vmin;" id="textBlurb">Welcome to the code demo page!</p>
				<!--
					demo container
				-->
				<div class="demoContainer">
					<div id="misc">
						
						<label class="idLabel" for="drawScale">Scale:</label>

						<input class="numVal" type="number" id="drawScale" value="100">
						<label class="unitLabel" for="drawScale">px/m</label>

						<label class="idLabel" for="timeScale">Frames:</label>

						<input class="numVal" type="number" id="timeScale" value="60">
						<label class="unitLabel" for="drawScale">frames/sec</label>

						<input type="button" id="applyChanges" value="Apply" @click="_changeScales()">

					</div>

					<!--
						double pendulum demo content
					-->
					<div class="demoDiv" id="dpDemo">
						
						<div class="inputDiv" id="dp1">
							
							<label class="idLabel" for="l1">Pendulum 1:</label>
							
							<input class="numVal" type="number" id="l1" value="1">
							<label class="unitLabel" for="l1">m</label>

							<input class="numVal" type="number" id="m1" value="1">
							<label class="unitLabel" for="m1">kg</label>

							<input class="numVal" type="number" id="t1" value="3">
							<label class="unitLabel" for="t1">rad</label>

						</div>

						<div class="inputDiv" id="dp2">
							
							<label class="idLabel" for="l2">Pendulum 2:</label>
							
							<input class="numVal" type="number" id="l2" value="1">
							<label class="unitLabel" for="l2">m</label>

							<input class="numVal" type="number" id="m2" value="1">
							<label class="unitLabel" for="m2">kg</label>

							<input class="numVal" type="number" id="t2" value="4">
							<label class="unitLabel" for="t2">rad</label>

						</div>

						<input class="newDemo" type="button" id="newDP" value="Run New Simulation" @click="_newDP()">

					</div>

					<!--
						chomp demo content
					-->
					<div class="demoDiv" id="chompDemo">
						
						<div class="inputDiv" id="gridOptions">
							
							<label class="idLabel" for="rows">Grid Size:</label>
							
							<input class="numVal" type="number" id="rows" value="4">
							<label class="unitLabel" for="rows">rows</label>
							<a>×</a>
							<input class="numVal" type="number" id="cols" value="7">
							<label class="unitLabel" for="cols">columns</label>

						</div>

						<div class="inputDiv" id="aiOptions">
							
							<label class="idLabel" for="l1">A.I. Settings:</label>
							
							<select class="listVal" id="aiDiff">
								<option id="0diff">Simple</option>
								<option id="1diff">Easy</option>
								<option id="2diff">Average</option>
								<option id="3diff">Hard</option>
								<option id="4diff">Expert</option>
							</select>
							
							<label>A.I. goes first?</label>
							<div id="aiFirst" @click="_toggleCheck()" @mouseenter="_hoverIn()" @mouseleave="_hoverOut()"></div>

						</div>

						<input class="newDemo" type="button" id="newChomp" value="New Chomp Game" @click="_newChomp()">

					</div>
					
					<!--
						third demo content
					-->
					<div class="demoDiv" id="thirdDemo">
						<p>Demo Third content</p>
					</div>

					<!--
						page canvas element
					-->
					<p style="display: none;" id="turnText"></p>
					<canvas id="cnv" width="100" height="100" @mousemove="_trackMouse" @mouseleave="_exitCanvas()" @click="_clickFn()"></canvas>

				</div>

			</div>

		</div>
	</div>
	<!--
		page stylesheet
	-->
	<link rel="stylesheet" type="text/css" href="src/demos/demos.css">
</template>
<!--
	page javascript
-->
<script type="module" src="/src/demos/demos.js"></script>