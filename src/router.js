import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './home/Home.vue'
import About from './about/About.vue'
import Experience from './experience/Experience.vue'
import Motivation from './motivation/Motivation.vue'
import Demos from './demos/Demos.vue'

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: '/', component: Home},
		{path: '/about', component: About},
		{path: '/experience', component: Experience},
		{path: '/motivation', component: Motivation},
		{path: '/demos', component: Demos},
	],
})