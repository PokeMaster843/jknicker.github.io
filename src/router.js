import { createRouter, createWebHistory } from 'https://unpkg.com/vue-router@4'
import Home from './home/Home.vue'
import About from './about/About.vue'
import Experience from './experience/Experience.vue'
import Motivation from './motivation/Motivation.vue'
import Demos from './demos/Demos.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', component: Home},
		{path: '/about', component: About},
		{path: '/experience', component: Experience},
		{path: '/motivation', component: Motivation},
		{path: '/demos', component: Demos},
	],
})