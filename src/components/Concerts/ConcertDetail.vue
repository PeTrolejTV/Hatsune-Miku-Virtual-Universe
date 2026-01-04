<template>
	<div class="modal modal-backdrop" @click.self="closeModalAndReset" v-if="concert">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content concert-modal-content">
				<div class="concert-modal-header">
					<button class="btn-close btn btn-light" @click="closeModalAndReset">
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
						<p v-if="concert.ticketsRemaining > 0" class="alert alert-success d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-person-check-fill me-2"></i>
							Tickets Remaining:<strong class="ms-2">{{ concert.ticketsRemaining }}</strong>
						</p>
						<p v-else class="alert alert-danger d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-x-circle-fill me-2"></i> 
							<strong>SOLD OUT!</strong>
						</p>
					</div>
					
					<div v-if="concert.ticketsRemaining > 0" class="d-flex align-items-center mb-4 quantity-control">
						<strong class="me-3">Amount:</strong>
						<div class="input-group">
							<button 
								class="btn btn-outline-secondary" 
								type="button" 
								@click="decrementAmount"
								@mousedown="startDecrementing"
								@touchstart="startDecrementing"
								@mouseup="stopChanging"
								@mouseleave="stopChanging"
								@touchend="stopChanging"
								:disabled="amount <= 1"
							>
								<i class="bi bi-dash"></i>
							</button>
							<input 
								type="text" 
								class="form-control text-center" 
								v-model.number="amount"
								readonly
							>
							<button 
								class="btn btn-outline-secondary" 
								type="button" 
								@click="incrementAmount"
								@mousedown="startIncrementing"
								@touchstart="startIncrementing"
								@mouseup="stopChanging"
								@mouseleave="stopChanging"
								@touchend="stopChanging"
								:disabled="amount >= maxAmount || amount >= concert.ticketsRemaining"
							>
								<i class="bi bi-plus"></i>
							</button>
						</div>
					</div>
					
					<p class="mb-0">{{ concert.description }}</p>
				</div>
				
				<div class="modal-footer">
					<button 
						type="button" 
						class="btn btn-secondary" 
						@click="closeModalAndReset"
					>
						Close
					</button>
					<button 
						type="button" 
						class="btn btn-primary"
						@click="addToCartHandler"
						:disabled="amount < 1 || amount > concert.ticketsRemaining || concert.ticketsRemaining === 0"
					>
						<span v-if="concert.ticketsRemaining > 0">
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
export default {
	name: 'ConcertDetailModal',
	props: {
		concert: {
			type: Object,
			required: true
		}
	},
	emits: ['close', 'add-to-cart'],
	data() {
		return {
			amount: 1,
			minAmount: 1,
			maxAmount: 99,
			intervalId: null,
			timeoutId: null,
			isHolding: false
		}
	},
	watch: {
		amount(newAmount) {
			const effectiveMax = Math.min(this.maxAmount, this.concert ? this.concert.ticketsRemaining : 0)
			if (newAmount > effectiveMax) this.amount = effectiveMax || 1
			if (newAmount < this.minAmount) this.amount = this.minAmount
		},
		concert(newVal) {
			if (newVal) this.amount = 1
		}
	},
	mounted() {
		document.body.style.overflow = 'hidden'
	},
	beforeUnmount() {
		this.stopChanging()
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
		decrementAmount() {
			if (this.amount > this.minAmount) this.amount--
		},
		incrementAmount() {
			const effectiveMax = Math.min(this.maxAmount, this.concert.ticketsRemaining)
			if (this.amount < effectiveMax) this.amount++
		},
		addToCartHandler() {
			if (this.amount > 0 && this.amount <= this.concert.ticketsRemaining) {
				this.$emit('add-to-cart', {
					id: this.concert.id,
					name: this.concert.title,
					price: this.concert.price,
					amount: -this.amount,
					type: 'concert'
				})
			}
		},
		closeModalAndReset() {
			this.stopChanging()
			this.amount = 1
			this.$emit('close')
		},
		startChanging(method) {
			this.isHolding = true
			this.timeoutId = setTimeout(() => {
				this.timeoutId = setTimeout(() => {
					clearInterval(this.intervalId)
					this.intervalId = setInterval(method, 50)
				}, 2500)
				this.intervalId = setInterval(method, 150)
			}, 500)
		},
		stopChanging() {
			this.isHolding = false
			clearTimeout(this.timeoutId)
			clearInterval(this.intervalId)
			this.timeoutId = null
			this.intervalId = null
			if (window.getSelection) window.getSelection().removeAllRanges()
		},
		startIncrementing() {
			this.stopChanging()
			this.startChanging(this.incrementAmount)
		},
		startDecrementing() {
			this.stopChanging()
			this.startChanging(this.decrementAmount)
		}
	}
}
</script>