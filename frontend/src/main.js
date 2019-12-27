import Vue from 'vue'
import App from './App.vue'

/* Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app') */

const NotFound = { template: '<p>Page not found</p>' }
// const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
	'/':      App,
	'/about': About,
}

new Vue({
	el:   '#app',
	data: {
		currentRoute: window.location.pathname,
	},
	computed: {
		ViewComponent () {
			return routes[this.currentRoute] || NotFound
		},
	},
	render (h) { return h(this.ViewComponent) },
}).$mount('#app')
