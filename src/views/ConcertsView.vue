<template>
	<div class="concerts-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-music-note-list me-3"></i>
					Virtual Concerts
				</h1>
				<p class="lead text-muted">
					Experience Hatsune Miku's magical performances from anywhere in the world
				</p>
			</div>
			
			<ConcertFilter 
				:favorite-ids="favoriteIds"
				@update-results="setFilteredConcerts"
			/>
			
			<div v-if="displayConcerts.length > 0" class="row g-4">
				<div 
					v-for="concert in displayConcerts" 
					:key="concert.id"
					class="col-lg-4 col-md-6"
				>
					<ConcertCard 
						:concert="concert"
						@favorite-updated="refreshFavorites"
					/>
				</div>
			</div>
			
			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No concerts found.</h3>
			</div>
		</div>
	</div>
</template>

<script>
import ConcertCard from '@/components/Concerts/ConcertCard.vue'
import ConcertFilter from '@/components/Concerts/ConcertFilter.vue'

export default {
	name: 'ConcertsView',
	components: {
		ConcertCard,
		ConcertFilter
	},
	data() {
		return {
			displayConcerts: [],
			favoriteIds: [],
			storageKey: 'miku_favorite_concerts'
		}
	},
	mounted() {
		this.refreshFavorites();
		document.title = 'Concerts | Miku Universe';
	},
	methods: {
		setFilteredConcerts(results) {
			this.displayConcerts = results;
		},
		refreshFavorites() {
			this.favoriteIds = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
		}
	}
}
</script>
