<template>
	<div 
		class="card concert-card h-100 shadow-sm" 
		:class="{ 'concert-expired': isExpired }"
	>
		<div v-if="isExpired" class="expired-label">
			EXPIRED
		</div>

		<img :src="concert.image" class="card-img-top" :alt="concert.title" />
		
		<div class="card-body d-flex flex-column">
			<h5 class="card-title">{{ concert.title }}</h5>
			
			<div class="concert-info mb-3">
				<p class="mb-2">
					<i class="bi bi-calendar-event text-primary me-2"></i>
					<strong>Date:</strong> {{ formatDate(concert.date) }}
				</p>
				<p class="mb-2">
					<i class="bi bi-clock text-primary me-2"></i>
					<strong>Time:</strong> {{ concert.time }}
				</p>
				<p class="mb-2">
					<i class="bi bi-display text-primary me-2"></i>
					<strong>Platform:</strong> {{ concert.platform }}
				</p>
				<p class="mb-2">
					<i class="bi bi-ticket-perforated text-primary me-2"></i>
					<strong>Price: </strong> 
					<span class="text-success fw-bold">{{ concert.price }}€</span>
				</p>
				<p class="mb-0 mt-3" :class="isExpired ? 'text-muted' : (concert.ticketsRemaining > 0 ? 'text-success' : 'text-danger')">
					<i class="bi me-2" :class="concert.ticketsRemaining > 0 ? 'bi-people-fill' : 'bi-slash-circle'"></i>
					<strong>Status: </strong> 
					<span class="fw-bold">
						<template v-if="isExpired">CONCLUDED</template>
						<template v-else-if="concert.ticketsRemaining > 0">
							AVAILABLE ({{ concert.ticketsRemaining }} left)
						</template>
						<template v-else>SOLD OUT</template>
					</span>
				</p>
			</div>
			
			<p class="card-text text-muted flex-grow-1">{{ concert.description }}</p>
			
			<div class="d-flex gap-2 mt-auto">
				<template v-if="!isExpired">
					<button 
						class="btn btn-favorite" 
						:class="{ active: isFavorite }"
						@click="toggleFavorite"
					>
						<i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
					</button>
					<button class="btn btn-primary flex-grow-1" @click="showDetail = true">
						<i class="bi bi-info-circle me-1"></i>Details
					</button>
				</template>
				<button v-else class="btn btn-outline-secondary flex-grow-1" disabled>
					<i class="bi bi-archive me-1"></i>Concert Finished
				</button>
			</div>
		</div>

		<ConcertDetail 
			v-if="showDetail" 
			:concert="concert" 
			@close="showDetail = false" 
		/>
	</div>
</template>

<script>
import ConcertDetail from '@/components/Concerts/ConcertDetail.vue'
import { useWishlistStore } from '@/stores/wishlist'

export default {
	name: 'ConcertCard',
	components: { ConcertDetail },
	props: {
		concert: { type: Object, required: true }
	},
	data() {
		return {
			showDetail: false
		}
	},
	computed: {
		wishlistStore() { return useWishlistStore() },
		isFavorite() {
			return this.wishlistStore.isConcertFavorite(this.concert.id)
		},
		isExpired() {
			const timePart = this.concert.time ? this.concert.time.split(' ')[0] : '00:00';
			const concertDateTime = new Date(`${this.concert.date}T${timePart}`);
			return concertDateTime < new Date();
		}
	},
	mounted() {
		if (this.isExpired && this.isFavorite) {
			this.wishlistStore.cleanupExpiredConcert(this.concert.id);
		}
	},
	methods: {
		formatDate(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', { 
				year: 'numeric', month: 'long', day: 'numeric' 
			})
		},
		toggleFavorite() {
			if (!this.isExpired) {
				this.wishlistStore.toggleConcertFavorite(this.concert.id);
			}
		}
	}
}
</script>
