<template>
	<div id="app">
		<NavBar />

		<main class="main-content">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>

		<footer class="footer mt-5 py-4 bg-dark text-white">
			<div class="container text-center">
				<p class="mb-0">
					<i class="bi bi-music-note-beamed"></i>
					Hatsune Miku Virtual Concert Portal © 2025
					<i class="bi bi-music-note-beamed"></i>
				</p>
				<small>Made with ❤️ for Miku fans worldwide</small>
			</div>
		</footer>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
	name: 'App',

	components: {
		NavBar
	}
}
</script>

<style>
#app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
}

.main-content {
	flex: 1;
	padding-top: 80px;
	padding-bottom: 20px;
}

.footer {
	margin-top: auto;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>
