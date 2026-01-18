<template>
	<div class="card product-card h-100 shadow-sm">
		<div v-if="product.isNew" class="badge-new">NEW</div>
		<img :src="product.image" class="card-img-top" :alt="product.name" />
		
		<div class="card-body d-flex flex-column">
			<h5 class="card-title">{{ product.name }}</h5>
			<p class="text-muted small mb-2"><i class="bi bi-tag me-1"></i>{{ product.category }}</p>
			<p class="card-text text-muted flex-grow-1">{{ product.description }}</p>
			
			<div class="d-flex justify-content-between align-items-center mb-3">
				<span class="h4 text-success mb-0">{{ product.price }}€</span>
				<div class="rating">
					<span v-for="star in 5" :key="star">
						<i class="bi" :class="star <= product.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'"></i>
					</span>
				</div>
			</div>
			
			<div class="stock-info mb-3">
				<span class="badge" :class="displayStock > 0 ? 'bg-success' : 'bg-danger'">
					{{ displayStock > 0 ? 'In Stock' : 'Out of Stock' }}
				</span>
				<span v-if="displayStock > 0" class="text-muted small ms-2">{{ displayStock }} available</span>
			</div>
			
			<div class="d-flex gap-2 mt-auto">
				<button 
					class="btn btn-favorite" 
					:class="{ active: isFavorite }" 
					@click="toggleFavorite"
				>
					<i class="bi" :class="isFavorite ? 'bi-heart-fill' : 'bi-heart'"></i>
				</button>
				<button class="btn btn-primary flex-grow-1" @click="showDetail = true">
					<i class="bi bi-eye me-1"></i>Details
				</button>
			</div>
		</div>

		<ProductDetail 
			v-if="showDetail" 
			:product="product" 
			@close="showDetail = false" 
		/>
	</div>
</template>

<script>
import ProductDetail from '@/components/Merch/ProductDetail.vue'
import { useWishlistStore } from '@/stores/wishlist'

export default {
	name: 'ProductCard',
	components: { ProductDetail },
	props: {
		product: { type: Object, required: true }
	},
	data() {
		return {
			showDetail: false
		}
	},
	computed: {
		wishlistStore() { return useWishlistStore() },
		isFavorite() {
			return this.wishlistStore.isProductFavorite(this.product.id)
		},
		displayStock() {
			if (this.product.category === 'Clothing' && this.product.stockBySize) {
				return Object.values(this.product.stockBySize).reduce((a, b) => a + b, 0);
			}
			return this.product.stock || 0;
		}
	},
	methods: {
		toggleFavorite() {
			this.wishlistStore.toggleProductFavorite(this.product.id);
		}
	}
}
</script>
