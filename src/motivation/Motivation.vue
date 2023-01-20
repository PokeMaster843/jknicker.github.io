<script setup>
	import "./motivation.css"
</script>

<template>
	<div id="parent" style="visibility:hidden">
		<!--
			page title container
		-->
		<div class="pageTitle">
			<h1>Motivation</h1>
		</div>

		<!--
			page body container
		-->
		<div class="pageBody">
			<p id="introText"><i>The purpose of this page is to more or less explain why I chose to create this demo site, and why I chose to use the technologies I did to create it.</i></p>
			<br>

			<div id="qna">
				<h3>Why Make a Demo Site?</h3>
				<p><i>Well, I wanted to have some kind of digital portfolio to demonstrate my abilities. And, having some degree of interest in web development/web design, I figured I'd try my hand at it and turn it into a fun exercise for myself!</i></p>

				<h3>Why Vue/Vite?</h3>
				<p><i>I don't have much experience working with web frameworks. I've only done a tiny bit with Ruby on Rails in the past. For this project, since virtually all frameworks would be just as new to me, I decided to use one that appeals to me on a personal level. I found the Vue/Vite framework particularly interesting, and upon further inspection relatively easy to use. As such, I opted to use it for this project.</i></p>
				
				<h3>Why Use Git on a Solo Project?</h3>
				<p><i>Despite the fact that I'm the only one working on this project, I still decided to use Git. I figured it was about time I learned how to use it, as it will likely be necessary to be familiar with some kind of source control for future jobs or internships. Also, since I could easily host my site on Github Pages, it made sense to learn now rather than on a later project.</i></p>
			</div>
		</div>
	</div>
</template>