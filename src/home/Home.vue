<script setup>
	import "./home.css"
</script>

<template>
	<div id="parent" style="visibility:hidden">
		<!--
			page title container
		-->
		<div class="pageTitle">
			<h1>Welcome to my page!</h1>
		</div>

		<!--
			page body container
		-->
		<div class="pageBody">
			<p id="welcomeText">
				Welcome to my demo site! I hope you find it useful in some capacity!<br><br>
				Hover over the menu icon in the top right corner to see what pages you can visit!<br><br>
				Click the home icon in the top left corner at any time to return to this page!<br><br>
			</p>

			<form id="userForm" action="mailto:jobs.jknicker@gmail.com">
				<label for="feedback">Feedback: </label>
				<br>
				<textarea name="feedback" id="feedback">Found a bug? Have a suggestion? Simply don't like a certain part of the site, style-wise or other? Feel free to tell me about it with this anonymous feedback!</textarea>
				<br>
				<input type="submit" id="submitFeedback" value="Submit Feedback">
			</form>
		</div>
	</div>
</template>