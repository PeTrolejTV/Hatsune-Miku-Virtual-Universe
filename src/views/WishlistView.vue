<template>
	<div class="wishlist-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-2">
					<i class="bi bi-heart me-2"></i>
					My Wishlist
				</h1>
				<p class="lead text-muted">Your curated collection of favorite items</p>
			</div>

			<div v-if="wishlistStore.hasItems" class="wishlist-stats-box mb-5 shadow-sm">
				<div class="row text-center g-0">
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Total Items</span>
						<span class="value">{{ totalCount }}</span>
					</div>
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Concerts</span>
						<span class="value">{{ stats.concertsValue }}€</span>
					</div>
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Merchandise</span>
						<span class="value">{{ stats.productsValue }}€</span>
					</div>
					<div class="col-6 col-md-3 stat-item no-border">
						<span class="label">Total Price</span>
						<span class="value highlight">{{ totalPrice }}€</span>
					</div>
				</div>
			</div>

			<div v-if="favoriteConcerts.length > 0" class="wishlist-section mb-5">
				<div class="section-header d-flex justify-content-between align-items-center mb-4 bg-white shadow-sm py-2 pe-4 sub-title-box">
					<h3 class="mb-0">Favorite Concerts</h3>
					<button class="btn-clear-wishlist" @click="showConfirm('concerts')">
						<i class="bi bi-trash me-1"></i> Clear All
					</button>
				</div>
				<div class="row g-4">
					<div v-for="concert in favoriteConcerts" :key="'c-' + concert.id" class="col-lg-4 col-md-6">
						<ConcertCard :concert="concert" />
					</div>
				</div>
			</div>

			<div v-if="favoriteProducts.length > 0" class="wishlist-section mb-5">
				<div class="section-header d-flex justify-content-between align-items-center mb-4 bg-white shadow-sm py-2 pe-4 sub-title-box">
					<h3 class="mb-0">Favorite Products</h3>
					<button class="btn-clear-wishlist" @click="showConfirm('products')">
						<i class="bi bi-trash me-1"></i> Clear All
					</button>
				</div>
				<div class="row g-4">
					<div v-for="product in favoriteProducts" :key="'p-' + product.id" class="col-lg-3 col-md-4 col-sm-6">
						<ProductCard :product="product" />
					</div>
				</div>
			</div>

			<div v-if="!wishlistStore.hasItems" class="empty-wishlist shadow-sm">
				<i class="bi bi-heartbreak display-2 opacity-25"></i>
				<h3 class="mt-3 text-secondary">Your wishlist is empty</h3>
				<p class="text-muted">Explore our concerts or merch to add items here.</p>
				<div class="mt-4 d-flex gap-2 justify-content-center">
					<RouterLink to="/concerts" class="btn btn-miku-outline">Browse Concerts</RouterLink>
					<RouterLink to="/merch" class="btn btn-miku-outline">Browse Merch</RouterLink>
				</div>
			</div>
		</div>

		<div v-if="confirmVisible" class="confirm-modal-backdrop" @click.self="cancelClear">
			<div class="confirm-modal shadow-lg">
				<h5 class="mb-3">Are you sure?</h5>
				<p class="mb-4 text-muted">This will remove all <strong>{{ confirmType === 'concerts' ? 'concerts' : 'products' }}</strong> from your wishlist.</p>
				<div class="d-flex justify-content-end gap-2">
					<button class="btn btn-light border" @click="cancelClear">Cancel</button>
					<button class="btn btn-danger" @click="confirmClear">Yes, clear all</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ConcertCard from '@/components/Concerts/ConcertCard.vue'
import ProductCard from '@/components/Merch/ProductCard.vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useConcertsStore } from '@/stores/concerts'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'WishlistView',
	components: {
		ConcertCard,
		ProductCard
	},
	data() {
		return {
			confirmVisible: false,
			confirmType: ''
		}
	},
	watch: {
		confirmVisible(value) {
			if (value) {
				document.body.classList.add('modal-open')
			} else {
				document.body.classList.remove('modal-open')
			}
		}
	},
	computed: {
		wishlistStore() { return useWishlistStore() },
		concertsStore() { return useConcertsStore() },
		merchStore() { return useMerchStore() },
		
		favoriteConcerts() {
			return this.concertsStore.concerts.filter(c => 
				this.wishlistStore.favConcertIds.includes(c.id)
			)
		},
		favoriteProducts() {
			return this.merchStore.allProducts.filter(p => 
				this.wishlistStore.favProductIds.includes(p.id)
			)
		},
		totalCount() {
			return this.favoriteConcerts.length + this.favoriteProducts.length
		},
		stats() {
			const cVal = this.favoriteConcerts.reduce((acc, c) => acc + c.price, 0)
			const pVal = this.favoriteProducts.reduce((acc, p) => acc + p.price, 0)
			return {
				concertsValue: cVal.toFixed(2),
				productsValue: pVal.toFixed(2)
			}
		},
		totalPrice() {
			return (parseFloat(this.stats.concertsValue) + parseFloat(this.stats.productsValue)).toFixed(2)
		}
	},
	methods: {
		showConfirm(type) {
			this.confirmType = type
			this.confirmVisible = true
		},
		cancelClear() {
			this.confirmVisible = false
		},
		confirmClear() {
			this.wishlistStore.clearSection(this.confirmType)
			this.confirmVisible = false
		}
	}
}
</script>
