<!--
	import page stylesheet
-->
<script setup>
	import "./about.css"
</script>

<template>
	<!--
		parent element hidden by default so that on page load, user will not see elements without styling for a brief moment
	-->
	<div id="parent" style="visibility:hidden">
		<!--
			page title container
		-->
		<div class="pageTitle">
			<h1>About Me</h1>
		</div>

		<!--
			page body container
		-->
		<div class="pageBody">
			<img id="profile" src="../assets/job_profile.jpg">
			<p id="aboutText">Hello, my name is John Knickerbocker! I am currently a Third Year at the University of Virginia
			majoring in Computer Science and minoring in Japanese. Originating from my desire to make mods for <i>Minecraft</i>
			when I was in middle school, I have been programming in various languages for the better part of a decade now.
			What started as a hobby has turned into an intense passion that I am looking to make a career out of. I am highly
			driven, and very goal-oriented. I also enjoy tackling challenging problems, and try my utmost to maintain clean,
			readable, and manageable code in all of my projects. Thank you for your time, and please, look around as much as
			you like!</p>
		</div>
	</div>
</template>