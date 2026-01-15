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

			<div v-if="hasItems" class="wishlist-stats-box mb-5 shadow-sm">
				<div class="row text-center g-0">
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Total Items</span>
						<span class="value">{{ totalCount }}</span>
					</div>
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Concerts</span>
						<span class="value">{{ totalConcertsValue }}€</span>
					</div>
					<div class="col-6 col-md-3 stat-item">
						<span class="label">Merchandise</span>
						<span class="value">{{ totalProductsValue }}€</span>
					</div>
					<div class="col-6 col-md-3 stat-item no-border">
						<span class="label">Total Price</span>
						<span class="value highlight">{{ totalValue }}€</span>
					</div>
				</div>
			</div>

			<div v-if="favoriteConcerts.length > 0" class="wishlist-section mb-5">
				<div class="section-header d-flex justify-content-between align-items-center mb-4  bg-white shadow-sm py-2 pe-4 sub-title-box">
					<h3 class="mb-0">Favorite Concerts</h3>
					<button class="btn-clear-wishlist" @click="showConfirm('concerts')">
						<i class="bi bi-trash me-1"></i> Clear All
					</button>
				</div>
				<div class="row g-4">
					<div v-for="concert in favoriteConcerts" :key="'c-' + concert.id" class="col-lg-4 col-md-6">
						<ConcertCard 
							:concert="concert" 
							@show-details="openItem(concert, 'concert')"
							@favorite-updated="loadFavorites"
						/>
					</div>
				</div>
			</div>

			<div v-if="favoriteProducts.length > 0" class="wishlist-section mb-5">
				<div class="section-header d-flex justify-content-between align-items-center mb-4  bg-white shadow-sm py-2 pe-4 sub-title-box">
					<h3 class="mb-0">Favorite Products</h3>
					<button class="btn-clear-wishlist" @click="showConfirm('products')">
						<i class="bi bi-trash me-1"></i> Clear All
					</button>
				</div>
				<div class="row g-4">
					<div v-for="product in favoriteProducts" :key="'p-' + product.id" class="col-lg-3 col-md-4 col-sm-6">
						<ProductCard 
							:product="product" 
							@view-details="openItem(product, 'product')"
							@favorite-updated="loadFavorites"
						/>
					</div>
				</div>
			</div>

			<div v-if="!hasItems" class="empty-wishlist shadow-sm">
				<i class="bi bi-heart display-2 opacity-25"></i>
				<h3 class="mt-3 text-secondary">Your wishlist is empty</h3>
				<div class="mt-4 d-flex gap-2 justify-content-center">
					<RouterLink to="/concerts" class="btn btn-miku-outline">Concerts</RouterLink>
					<RouterLink to="/merch" class="btn btn-miku-outline">Merch Store</RouterLink>
				</div>
			</div>
		</div>

		<ConcertDetail
			v-if="selectedItem && itemType === 'concert'"
			:concert="selectedItem"
			@close="closeItem"
		/>

		<ProductDetail
			v-if="selectedItem && itemType === 'product'"
			:product="selectedItem"
			@close="closeItem"
		/>

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
import ConcertDetail from '@/components/Concerts/ConcertDetail.vue'
import ProductCard from '@/components/Merch/ProductCard.vue'
import ProductDetail from '@/components/Merch/ProductDetail.vue'

import { useConcertsStore } from '@/stores/concerts'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'WishlistView',
	components: {
		ConcertCard,
		ConcertDetail,
		ProductCard,
		ProductDetail
	},
	data() {
		return {
			selectedItem: null,
			itemType: null,
			favConcertIds: [],
			favProductIds: [],
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
		concertsStore() { return useConcertsStore() },
		merchStore() { return useMerchStore() },

		favoriteConcerts() {
			return this.concertsStore.concerts.filter(c => this.favConcertIds.includes(c.id))
		},
		favoriteProducts() {
			return this.merchStore.products.filter(p => this.favProductIds.includes(p.id))
		},
		hasItems() {
			return this.favoriteConcerts.length > 0 || this.favoriteProducts.length > 0
		},
		totalCount() {
			return this.favoriteConcerts.length + this.favoriteProducts.length
		},
		totalConcertsValue() {
			return this.favoriteConcerts.reduce((acc, c) => acc + c.price, 0).toFixed(2)
		},
		totalProductsValue() {
			return this.favoriteProducts.reduce((acc, p) => acc + p.price, 0).toFixed(2)
		},
		totalValue() {
			return (parseFloat(this.totalConcertsValue) + parseFloat(this.totalProductsValue)).toFixed(2)
		}
	},
	mounted() {
		this.loadFavorites()
	},
	methods: {
		loadFavorites() {
			this.favConcertIds = JSON.parse(localStorage.getItem('miku_favorite_concerts') || '[]')
			this.favProductIds = JSON.parse(localStorage.getItem('favorite_products') || '[]')
		},
		openItem(item, type) {
			this.selectedItem = item
			this.itemType = type
		},
		closeItem() {
			this.selectedItem = null
			this.itemType = null
		},
		showConfirm(type) {
			this.confirmType = type
			this.confirmVisible = true
		},
		cancelClear() {
			this.confirmVisible = false
		},
		confirmClear() {
			const key = this.confirmType === 'concerts' ? 'miku_favorite_concerts' : 'favorite_products'
			localStorage.setItem(key, '[]')
			this.loadFavorites()
			this.confirmVisible = false
		}
	}
}
</script>
