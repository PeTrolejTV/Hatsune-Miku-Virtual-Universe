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
						Hatsune Miku Virtual Universe © 2026
					<i class="bi bi-music-note-beamed"></i>
				</p>
				<small>Made with ❤️ for Miku fans worldwide</small>
			</div>
		</footer>
	</div>
</template>

<script>
import NavBar from './components/Common/NavBar.vue'
import { useConcertsStore } from '@/stores/concerts'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'App',
	components: {
		NavBar
	},
	computed: {
		concertsStore() { return useConcertsStore() },
		merchStore() { return useMerchStore() }
	},
	mounted() {
		this.initializeStores();
	},
	methods: {
		initializeStores() {
			this.concertsStore.initializeStock();
			this.merchStore.initializeStock();
		}
	}
}
</script>
