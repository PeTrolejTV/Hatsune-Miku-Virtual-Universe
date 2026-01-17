<template>
	<div class="cart-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-cart me-3"></i>
					Shopping Cart
				</h1>
				<p class="lead text-muted">
					Review your selected tickets and exclusive Hatsune Miku merchandise before checkout
				</p>
			</div>

			<div class="row justify-content-center">
				<div class="col-lg-10">
					<div class="card shadow-sm mb-4 border-0">
						<div class="card-body p-4">
							<h5 v-if="cartStore.items.length > 0" class="card-title fw-bold mb-4">Cart Summary</h5>
							
							<div v-if="cartStore.items.length === 0" class="text-center py-5">
								<i class="bi bi-cart-x display-1 text-muted opacity-25"></i>
								<h3 class="mt-3 text-secondary">Your cart is empty</h3>
								<p class="text-muted">Explore our concerts or merch to add items here.</p>
								<div class="d-flex justify-content-center gap-3 mt-3">
									<router-link to="/concerts" class="btn btn-outline-primary">
										Browse Concerts
									</router-link>
									<router-link to="/merch" class="btn btn-outline-primary">
										Browse Merch
									</router-link>
								</div>
							</div>
							
							<div v-else>
								<ul class="list-group list-group-flush mb-4">
									<li 
										v-for="item in cartStore.items" 
										:key="item.uniqueId" 
										class="list-group-item d-flex justify-content-between align-items-center py-3 px-0 bg-transparent"
									>
										<div class="d-flex align-items-center">
											<div class="cart-icon-wrapper me-3 d-none d-sm-flex">
												<i :class="item.type === 'concert' ? 'bi bi-ticket-perforated' : 'bi bi-bag-check'" class="fs-4 text-primary"></i>
											</div>
											<div>
												<h6 class="mb-0 fw-bold">{{ item.name }}</h6>
												<div class="d-flex gap-2 mt-1">
													<span class="badge bg-light text-dark border small text-capitalize">{{ item.type }}</span>
													<span v-if="item.size" class="badge bg-info text-white small">Size: {{ item.size }}</span>
												</div>
												<div class="text-muted small mt-1">
													{{ item.amount }}x {{ item.price.toFixed(2) }}€
												</div>
											</div>
										</div>
										
										<div class="d-flex align-items-center">
											<span class="fw-bold me-4 fs-5">{{ (item.amount * item.price).toFixed(2) }}€</span>
											<button @click="handleRemove(item)" class="btn btn-outline-danger btn-sm rounded-circle">
												<i class="bi bi-trash"></i>
											</button>
										</div>
									</li>
								</ul>

								<div class="mt-4 pt-4 border-top">
									<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
										<button @click="showConfirmation = true" class="btn btn-outline-danger px-4 rounded-pill mb-3 mb-md-0 shadow-sm">
											<i class="bi bi-trash-fill me-1"></i> Clear Entire Cart
										</button>
										
										<div class="text-md-end">
											<p class="mb-1 text-muted">Total ({{ cartStore.totalItems }} items):</p>
											<h2 class="text-primary fw-bold mb-3">{{ cartStore.totalPrice.toFixed(2) }}€</h2>
											<div class="d-grid d-md-block">
												<button 
													class="btn btn-primary btn-lg px-5 shadow-sm rounded-pill"
													title="Does not work: Implement check out lol"
												>
													Checkout <i class="bi bi-arrow-right ms-2"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="showConfirmation" class="custom-modal-backdrop" @click.self="showConfirmation = false">
			<div class="custom-modal shadow-lg border-0">
				<div class="p-4 text-center">
					<div class="text-danger mb-3">
						<i class="bi bi-exclamation-triangle display-4"></i>
					</div>
					<h5 class="fw-bold mb-2">Empty your cart?</h5>
					<p class="text-muted">This will return all items back to stock.</p>
					<div class="d-flex justify-content-center gap-2 mt-4">
						<button class="btn btn-light border px-4" @click="showConfirmation = false">Cancel</button>
						<button class="btn btn-danger px-4" @click="handleClearAll">Yes, clear all</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useCartStore } from '@/stores/cart'
import { useConcertsStore } from '@/stores/concerts'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'CartView',
	data() {
		return {
			showConfirmation: false
		}
	},
	computed: {
		cartStore() { return useCartStore() },
		concertsStore() { return useConcertsStore() },
		merchStore() { return useMerchStore() }
	},
	methods: {
		handleRemove(item) {
			const removedItem = this.cartStore.removeItem(item.uniqueId);
			if (removedItem) {
				this.returnToStock(removedItem);
			}
		},
		handleClearAll() {
			const itemsToReturn = [...this.cartStore.items];
			
			itemsToReturn.forEach(item => {
				this.returnToStock(item);
			});
			
			this.cartStore.clearCart();
			this.showConfirmation = false;
		},
		returnToStock(item) {
			if (item.type === 'concert') {
				this.concertsStore.updateTicketsRemaining(item.id, item.amount);
			} else if (item.type === 'product') { 
				this.merchStore.updateStock({
					id: item.id,
					amount: item.amount,
					size: item.size
				});
			}
		}
	}
}
</script>
