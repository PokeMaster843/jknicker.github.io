<!--
	import page stylesheet
-->
<script setup>
	import "./experience.css"
	import Experience from "./experience"
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
			<h1>Experience</h1>
		</div>

		<!--
			page body container
		-->
		<div class="pageBody">
			<p id="introText">Throughout the years, I have used a variety of different languages. However, I do not claim equal mastery over all of them. To see the details of my proficiency, click on a particular language. To hide details, click again.</p>
			<ul id="langs">
				<li @click="Experience._toggleVisible('asm')">
					<a>Assembly</a>
					<ul id="asm" class="langDetails">
						<li><a>Used for class</a></li>
						<li><a>Little personal experience</a></li>
					</ul>
				</li>

				<li @click="Experience._toggleVisible('cpp')">
					<a>C++</a>
					<ul id="cpp" class="langDetails">
						<li><a>Used for classes very frequently</a></li>
						<li><a>Used occasionally for personal projects</a></li>
					</ul>
				</li>
				
				<li @click="Experience._toggleVisible('git')">
					<a>Git</a>
					<ul id="git" class="langDetails">
						<li><a>Little experience (less than a year)</a></li>
					</ul>
				</li>

				<li @click="_toggleVisible('html')">
					<a>HTML</a>
					<ul id="html" class="langDetails">
						<li><a>Well-accustomed to language</a></li>
						<li><a>Used frequently for personal projects</a></li>
						<li><a>Confident in abilities</a></li>
						<li><a>Used in the making of this website</a></li>
					</ul>
				</li>
				
				<li @click="Experience._toggleVisible('java')">
					<a>Java</a>
					<ul id="java" class="langDetails">
						<li><a>First language learned - fairly well-accustomed to it</a></li>
						<li><a>Used occasionally for personal projects</a></li>
						<li><a>Confident in abilities</a></li>
					</ul>
				</li>
				
				<li @click="Experience._toggleVisible('js')">
					<a>JavaScript</a>
					<ul id="js" class="langDetails">
						<li><a>Well-accustomed to language</a></li>
						<li><a>Used frequently for personal projects</a></li>
						<li><a>Confident in abilities</a></li>
						<li><a>Used in the making of this website</a></li>
					</ul>
				</li>
				
				<li @click="Experience._toggleVisible('py')">
					<a>Python</a>
					<ul id="py" class="langDetails">
						<li><a>Little experience (less than a year)</a></li>
					</ul>
				</li>

				<li @click="Experience._toggleVisible('rb')">
					<a>Ruby on Rails/Ruby</a>
					<ul id="rb" class="langDetails">
						<li><a>Little experience (less than a year)</a></li>
						<li><a>Used occasionally for personal projects</a></li>
					</ul>
				</li>

				<li @click="Experience._toggleVisible('scss')">
					<a>SCSS/CSS</a>
					<ul id="scss" class="langDetails">
						<li><a>Some experience (1-2 years)</a></li>
						<li><a>Used occasionally for personal projects</a></li>
						<li><a>Used in the making of this website</a></li>
					</ul>
				</li>

				<li @click="Experience._toggleVisible('sql')">
					<a>SQL</a>
					<ul id="sql" class="langDetails">
						<li><a>Little experience (less than a year)</a></li>
					</ul>
				</li>

				<li @click="Experience._toggleVisible('vite')">
					<a>Vite/Vue</a>
					<ul id="vite" class="langDetails">
						<li><a>Little experience (less than a year)</a></li>
						<li><a>Used in the making of this website</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>