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
				:concerts="allConcerts" 
				:favorite-ids="favoriteIds"
				@update-results="setFilteredConcerts"
				ref="concertFilter"
			/>
			
			<div v-if="displayConcerts.length > 0" class="row g-4">
				<div 
					v-for="concert in displayConcerts" 
					:key="concert.id"
					class="col-lg-4 col-md-6"
				>
					<ConcertCard 
						:concert="concert"
						@show-details="showConcertDetails"
						@favorite-updated="refreshFavorites"
					/>
				</div>
			</div>
			
			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No concerts found.</h3>
			</div>
		</div>
		
		<ConcertDetailModal 
			v-if="selectedConcert"
			:concert="selectedConcert" 
			@close="clearSelectedConcert" 
		/>
	</div>
</template>

<script>
import ConcertCard from '@/components/Concerts/ConcertCard.vue'
import ConcertDetailModal from '@/components/Concerts/ConcertDetail.vue'
import ConcertFilter from '@/components/Concerts/ConcertFilter.vue'
import { useConcertsStore } from '@/stores/concerts'

export default {
	name: 'ConcertsView',
	components: {
		ConcertCard,
		ConcertDetailModal,
		ConcertFilter
	},
	data() {
		return {
			displayConcerts: [],
			selectedConcert: null,
			favoriteIds: [],
			storageKey: 'miku_favorite_concerts'
		}
	},
	computed: {
		allConcerts() {
			return useConcertsStore().concerts || [];
		}
	},
	mounted() {
		this.refreshFavorites();
	},
	methods: {
		setFilteredConcerts(results) {
			this.displayConcerts = results;
		},
		refreshFavorites() {
			this.favoriteIds = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
		},
		showConcertDetails(concert) {
			this.selectedConcert = concert;
		},
		clearSelectedConcert() {
			this.selectedConcert = null;
		}
	}
}
</script>
