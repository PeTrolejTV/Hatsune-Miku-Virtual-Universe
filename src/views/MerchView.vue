<template>
	<div class="merch-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-shop me-3"></i>
					Merch Store
				</h1>
				<p class="lead text-muted">
					Official Hatsune Miku merchandise and collectibles
				</p>
			</div>
			
			<ProductFilter @filter-updated="setFilteredProducts" />
			
			<div v-if="displayedProducts.length > 0" class="row g-4">
				<div 
					v-for="product in displayedProducts" 
					:key="product.id"
					class="col-lg-3 col-md-4 col-sm-6"
				>
					<ProductCard :product="product" />
				</div>
			</div>
			
			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No products found.</h3>
			</div>
		</div>
	</div>
</template>

<script>
import ProductCard from '@/components/Merch/ProductCard.vue'
import ProductFilter from '@/components/Merch/ProductFilter.vue'

export default {
	name: 'MerchView',
	components: {
		ProductCard,
		ProductFilter
	},
	data() {
		return {
			displayedProducts: []
		}
	},
	methods: {
		setFilteredProducts(results) {
			this.displayedProducts = results
		}
	}
}
</script>
