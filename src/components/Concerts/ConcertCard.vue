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
						<template v-if="isExpired">
							CONCLUDED
						</template>
						<template v-else-if="concert.ticketsRemaining > 0">
							AVAILABLE ({{ concert.ticketsRemaining }} left)
						</template>
						<template v-else>
							SOLD OUT
						</template>
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
					<button class="btn btn-primary flex-grow-1" @click="showDetails">
						<i class="bi bi-info-circle me-1"></i>Details
					</button>
				</template>

				<button v-else class="btn btn-outline-secondary flex-grow-1" disabled>
					<i class="bi bi-archive me-1"></i>Concert Finished
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConcertCard',
	props: {
		concert: {
			type: Object,
			required: true
		}
	},
	emits: ['show-details', 'favorite-updated'],
	data() {
		return {
			isFavorite: false,
			storageKey: 'miku_favorite_concerts'
		}
	},
	computed: {
		isExpired() {
			const timePart = this.concert.time ? this.concert.time.split(' ')[0] : '00:00';
			const concertDateTime = new Date(`${this.concert.date}T${timePart}`);
			const now = new Date();
			return concertDateTime < now;
		}
	},
	mounted() {
		this.cleanupExpiredFavorites();
	},
	methods: {
		cleanupExpiredFavorites() {
			let favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
			if (this.isExpired && favorites.includes(this.concert.id)) {
				favorites = favorites.filter(id => id !== this.concert.id);
				localStorage.setItem(this.storageKey, JSON.stringify(favorites));
				this.$emit('favorite-updated');
			}
			this.isFavorite = favorites.includes(this.concert.id);
		},
		formatDate(dateString) {
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' 
			})
		},
		showDetails() {
			this.$emit('show-details', this.concert)
		},
		toggleFavorite() {
			if (this.isExpired) return;
			this.isFavorite = !this.isFavorite;
			let favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
			if (this.isFavorite) {
				if (!favorites.includes(this.concert.id)) favorites.push(this.concert.id);
			} else {
				favorites = favorites.filter(id => id !== this.concert.id);
			}
			localStorage.setItem(this.storageKey, JSON.stringify(favorites));
			this.$emit('favorite-updated');
		}
	}
}
</script>
