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
			
			<div class="filter-wrapper mb-5 p-4 bg-white rounded-4 shadow-sm border position-relative">
				<button 
					@click="resetFilters" 
					class="btn btn-reset-filters" 
					title="Reset all filters"
				>
					<i class="bi bi-arrow-counterclockwise"></i>
				</button>

				<div class="filter-item search-field">
					<label class="form-label small fw-bold text-muted">Search Concerts</label>
					<div class="input-group">
						<span class="input-group-text bg-light border-end-0">
							<i class="bi bi-search"></i>
						</span>
						<input 
							v-model="searchQuery" 
							type="text" 
							class="form-control bg-light border-start-0" 
							placeholder="Magical Mirai..."
						>
					</div>
				</div>
				
				<div class="filter-item platform-field">
					<label class="form-label small fw-bold text-muted">Platform</label>
					<select v-model="filterPlatform" class="form-select bg-light">
						<option value="all">All Platforms</option>
						<option value="YouTube Live">YouTube Live</option>
						<option value="VRChat">VRChat</option>
						<option value="Twitch">Twitch</option>
						<option value="Metaverse">Metaverse</option>
					</select>
				</div>
				
				<div class="filter-item sort-field">
					<label class="form-label small fw-bold text-muted">Sort by Date or Tickets</label>
					<div class="d-flex gap-2">
						<button 
							@click="toggleSort('date')" 
							class="btn flex-grow-1 d-flex align-items-center justify-content-between"
							:class="sortKey === 'date' ? 'btn-miku-active' : 'btn-outline-primary'"
						>
							<span>
								<i class="bi bi-calendar3 me-2"></i>
								{{ sortKey === 'date' ? (sortOrder === 'desc' ? 'Newest' : 'Oldest') : 'Date' }}
							</span>
							<i v-if="sortKey === 'date'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
						</button>
						
						<button 
							@click="toggleSort('ticketsRemaining')" 
							class="btn flex-grow-1 d-flex align-items-center justify-content-between"
							:class="sortKey === 'ticketsRemaining' ? 'btn-miku-active' : 'btn-outline-primary'"
						>
							<span>
								<i class="bi bi-people me-2"></i>
								{{ sortKey === 'ticketsRemaining' ? (sortOrder === 'desc' ? 'Most' : 'Least') : 'Tickets' }}
							</span>
							<i v-if="sortKey === 'ticketsRemaining'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
						</button>
					</div>
				</div>
				
				<div class="filter-item price-field">
					<label class="form-label small fw-bold text-muted d-flex justify-content-between">
						Price Range <span class="text-miku-teal">{{ minPriceLimit }}€ - {{ maxPriceLimit }}€</span>
					</label>
					<div class="miku-slider-container">
						<div class="slider-track"></div>
						<div class="slider-range" :style="rangeStyle"></div>
						<input 
							type="range" 
							:min="absMinPrice" 
							:max="absMaxPrice" 
							v-model.number="minPriceLimit" 
							@input="validateRange"
							class="miku-range"
						>
						<input 
							type="range" 
							:min="absMinPrice" 
							:max="absMaxPrice" 
							v-model.number="maxPriceLimit" 
							@input="validateRange"
							class="miku-range"
						>
					</div>
				</div>
				
				<div class="filter-item switch-field">
					<label class="form-label small fw-bold text-muted d-block text-nowrap mb-2">Filters</label>
					<div class="d-flex flex-column gap-2">
						<div class="form-check form-switch d-flex align-items-center">
							<input 
								class="form-check-input custom-miku-switch me-2" 
								type="checkbox" 
								role="switch"
								id="hideSoldOut" 
								v-model="hideSoldOut"
							>
							<label class="form-check-label small text-muted" for="hideSoldOut">Hide Sold Out</label>
						</div>
						<div class="form-check form-switch d-flex align-items-center">
							<input 
								class="form-check-input custom-miku-switch me-2" 
								type="checkbox" 
								role="switch"
								id="showFavorites" 
								v-model="showOnlyFavorites"
							>
							<label class="form-check-label small text-muted" for="showFavorites">Show Favorites</label>
						</div>
					</div>
				</div>
			</div>
			
			<div v-if="filteredConcerts.length > 0" class="row g-4">
				<div 
					v-for="concert in filteredConcerts" 
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
				<h3 class="mt-3 text-secondary">No concerts found matching your filters.</h3>
				<button class="btn btn-outline-primary mt-2" @click="resetFilters">Clear all filters</button>
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
import ConcertCard from '@/components/ConcertCard.vue'
import ConcertDetailModal from '@/components/ConcertDetailModal.vue'
import { useConcertsStore } from '@/stores/concerts'

export default {
	name: 'ConcertsView',
	components: {
		ConcertCard,
		ConcertDetailModal 
	},
	data() {
		return {
			searchQuery: '',
			filterPlatform: 'all',
			sortKey: 'date',
			sortOrder: 'desc',
			minPriceLimit: 0,
			maxPriceLimit: 1000,
			absMinPrice: 0,
			absMaxPrice: 1000,
			hideSoldOut: true,
			showOnlyFavorites: false,
			selectedConcert: null,
			favoriteIds: [],
			storageKey: 'miku_favorite_concerts'
		}
	},
	computed: {
		concertsStore() {
			return useConcertsStore()
		},
		rangeStyle() {
			const range = this.absMaxPrice - this.absMinPrice
			if (range === 0) return { left: '0%', right: '0%' }
			const left = ((this.minPriceLimit - this.absMinPrice) / range) * 100
			const right = 100 - ((this.maxPriceLimit - this.absMinPrice) / range) * 100
			return {
				left: left + '%',
				right: right + '%'
			}
		},
		filteredConcerts() {
			let results = [...(this.concertsStore.concerts || [])]
			
			if (this.showOnlyFavorites) {
				results = results.filter(c => this.favoriteIds.includes(c.id));
			}

			if (this.filterPlatform !== 'all') {
				results = results.filter(c => c.platform === this.filterPlatform)
			}
			
			if (this.searchQuery) {
				const query = this.searchQuery.toLowerCase()
				results = results.filter(c => 
					c.title.toLowerCase().includes(query) ||
					c.description.toLowerCase().includes(query)
				)
			}
			
			results = results.filter(c => c.price >= this.minPriceLimit && c.price <= this.maxPriceLimit)
			
			if (this.hideSoldOut) {
				results = results.filter(c => c.ticketsRemaining > 0)
			}
			
			results.sort((a, b) => {
				let modifier = this.sortOrder === 'asc' ? 1 : -1
				if (this.sortKey === 'date') {
					return (new Date(a.date) - new Date(b.date)) * modifier
				} else if (this.sortKey === 'ticketsRemaining') {
					return (a.ticketsRemaining - b.ticketsRemaining) * modifier
				}
				return 0
			})
			
			return results
		}
	},
	mounted() {
		this.initializePriceLimits()
		this.refreshFavorites()
	},
	methods: {
		refreshFavorites() {
			this.favoriteIds = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
		},
		initializePriceLimits() {
			const concerts = this.concertsStore.concerts
			if (concerts && concerts.length > 0) {
				const prices = concerts.map(c => c.price)
				this.absMinPrice = Math.min(...prices)
				this.absMaxPrice = Math.max(...prices)
				this.minPriceLimit = this.absMinPrice
				this.maxPriceLimit = this.absMaxPrice
			}
		},
		validateRange() {
			if (this.minPriceLimit > this.maxPriceLimit) {
				const temp = this.minPriceLimit
				this.minPriceLimit = this.maxPriceLimit
				this.maxPriceLimit = temp
			}
		},
		toggleSort(key) {
			if (this.sortKey === key) {
				this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc'
			} else {
				this.sortKey = key
				this.sortOrder = 'desc'
			}
		},
		showConcertDetails(concert) {
			this.selectedConcert = concert
		},
		clearSelectedConcert() {
			this.selectedConcert = null
		},
		resetFilters() {
			this.searchQuery = ''
			this.filterPlatform = 'all'
			this.sortKey = 'date'
			this.sortOrder = 'desc'
			this.minPriceLimit = this.absMinPrice
			this.maxPriceLimit = this.absMaxPrice
			this.hideSoldOut = true
			this.showOnlyFavorites = false
		}
	}
}
</script>
