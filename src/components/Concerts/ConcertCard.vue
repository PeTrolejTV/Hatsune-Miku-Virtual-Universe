<template>
	<div class="card concert-card h-100 shadow-sm">
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
				
				<p class="mb-0 mt-3" :class="concert.ticketsRemaining > 0 ? 'text-success' : 'text-danger'">
					<i class="bi me-2" :class="concert.ticketsRemaining > 0 ? 'bi-people-fill' : 'bi-slash-circle'"></i>
					<strong>Tickets Remaining: </strong> 
					<span class="fw-bold">{{ concert.ticketsRemaining > 0 ? concert.ticketsRemaining : 'SOLD OUT' }}</span>
				</p>
			</div>
			
			<p class="card-text text-muted flex-grow-1">{{ concert.description }}</p>
			
			<div class="d-flex gap-2 mt-auto">
				<button 
					class="btn btn-favorite" 
					:class="{ active: isFavorite }"
					@click="toggleFavorite"
					:aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
				>
					<i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
				</button>
				<button class="btn btn-primary flex-grow-1" @click="showDetails">
					<i class="bi bi-info-circle me-1"></i>Details
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
			required: true,
			validator: (value) => {
				return value.id && value.title && value.date && typeof value.ticketsRemaining === 'number'
			}
		}
	},
	emits: ['show-details', 'favorite-updated'],
	data() {
		return {
			isFavorite: false,
			storageKey: 'miku_favorite_concerts'
		}
	},
	mounted() {
		const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
		this.isFavorite = favorites.includes(this.concert.id);
	},
	methods: {
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
			this.isFavorite = !this.isFavorite;
			let favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
			
			if (this.isFavorite) {
				if (!favorites.includes(this.concert.id)) {
					favorites.push(this.concert.id);
				}
			} else {
				favorites = favorites.filter(id => id !== this.concert.id);
			}
			
			localStorage.setItem(this.storageKey, JSON.stringify(favorites));
			this.$emit('favorite-updated');
		}
	}
}
</script>