<template>
	<div class="modal modal-backdrop" @click.self="closeAndReset" v-if="concert">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content concert-modal-content">
				<div class="concert-modal-header">
					<button class="btn-close btn btn-light" @click="closeAndReset">
						<i class="bi bi-x-lg"></i>
					</button>
				</div>
				
				<div class="modal-body">
					<h5 class="modal-title mb-3">{{ concert.title }}</h5>
					
					<img 
						:src="concert.image" 
						:alt="concert.title"
						class="img-fluid rounded mb-3 modal-image-style"
					/>
					
					<p><strong>Date:</strong> {{ formatDate(concert.date) }}</p>
					<p><strong>Time:</strong> {{ concert.time }}</p>
					<p><strong>Platform:</strong> {{ concert.platform }}</p>
					<p class="mb-3"><strong>Price:</strong> {{ concert.price }}€</p>
					
					<div class="mb-4">
						<p v-if="remainingCapacity > 0" class="alert alert-success d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-person-check-fill me-2"></i>
							Tickets Remaining:<strong class="ms-2">{{ remainingCapacity }}</strong>
						</p>
						<p v-else class="alert alert-danger d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-x-circle-fill me-2"></i> 
							<strong>SOLD OUT!</strong>
						</p>
					</div>
					
					<QuantityControl
						v-if="remainingCapacity > 0"
						v-model:value="amount"
						:min="1"
						:max="maxQuantity"
						class="mb-4"
					/>
					
					<p class="mb-0">{{ concert.description }}</p>
				</div>
				
				<div class="modal-footer">
					<button 
						type="button" 
						class="btn btn-secondary" 
						@click="closeAndReset"
					>
						Close
					</button>
					<button 
						type="button" 
						class="btn btn-primary"
						@click="addToCartHandler"
						:disabled="amount < 1 || amount > remainingCapacity || remainingCapacity === 0"
					>
						<span v-if="remainingCapacity > 0">
							<i class="bi bi-cart-plus me-2"></i> Add {{ amount }} ticket(s) to Cart
						</span>
						<span v-else>
							Sold Out
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QuantityControl from '@/components/QuantityControl.vue'
import { useCartStore } from '@/stores/cart'
import { useConcertsStore } from '@/stores/concerts'

export default {
	name: 'ConcertDetail',
	components: {
		QuantityControl
	},
	props: {
		concert: {
			type: Object,
			required: true
		}
	},
	emits: ['close'],
	data() {
		return {
			amount: 1
		}
	},
	computed: {
		cartStore() {
			return useCartStore();
		},
		concertsStore() {
			return useConcertsStore();
		},
		remainingCapacity() {
			if (!this.concert) return 0
			return Math.max(0, this.concert.ticketsRemaining)
		},
		maxQuantity() {
			return Math.min(99, this.remainingCapacity)
		}
	},
	watch: {
		concert(newVal) {
			if (newVal) this.amount = 1
		}
	},
	mounted() {
		document.body.style.overflow = 'hidden'
	},
	beforeUnmount() {
		document.body.style.overflow = ''
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
		addToCartHandler() {
			if (this.amount > 0 && this.amount <= this.remainingCapacity) {
				this.cartStore.addItem({
					id: this.concert.id,
					name: this.concert.title,
					price: this.concert.price,
					amount: this.amount,
					type: 'concert'
				});

				this.concertsStore.updateTicketsRemaining(this.concert.id, -this.amount);
				
				this.closeAndReset();
			}
		},
		closeAndReset() {
			this.amount = 1
			this.$emit('close')
		}
	}
}
</script>
