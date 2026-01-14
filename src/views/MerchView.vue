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
			
			<ProductFilter 
				:products="allProducts" 
				:favorite-ids="favoriteIds"
				@filter-updated="setFilteredProducts" 
				ref="productFilter"
			/>
			
			<div v-if="displayedProducts.length > 0" class="row g-4">
				<div 
					v-for="product in displayedProducts" 
					:key="product.id"
					class="col-lg-3 col-md-4 col-sm-6"
				>
					<ProductCard 
						:product="product"
						@view-details="viewProductDetails"
						@favorite-updated="refreshFavorites"
					/>
				</div>
			</div>
			
			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No products found.</h3>
			</div>
		</div>
		
		<ProductDetail
			v-if="selectedProduct"
			:product="selectedProduct"
			@close="clearSelectedProduct"
		/>
	</div>
</template>

<script>
import ProductCard from '@/components/Merch/ProductCard.vue'
import ProductDetail from '@/components/Merch/ProductDetail.vue'
import ProductFilter from '@/components/Merch/ProductFilter.vue'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'MerchView',
	components: {
		ProductCard,
		ProductDetail,
		ProductFilter
	},
	data() {
		return {
			displayedProducts: [],
			selectedProduct: null,
			favoriteIds: [],
			storageKey: 'favorite_products'
		}
	},
	computed: {
		allProducts() {
			return useMerchStore().products || [];
		}
	},
	watch: {
		selectedProduct(newVal) {
			if (newVal) {
				document.title = `Merch - ${newVal.name} | Miku Universe`;
			} else {
				document.title = this.$route.meta.title || 'Merch Store | Miku Universe';
			}
		},

		allProducts: {
			immediate: true,
			handler(newVal) {
				if (newVal && newVal.length > 0 && this.displayedProducts.length === 0) {
					this.displayedProducts = newVal;
				}
			}
		}
	},
	mounted() {
		this.refreshFavorites();
	},
	methods: {
		setFilteredProducts(results) {
			this.displayedProducts = results;
		},
		refreshFavorites() {
			this.favoriteIds = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
		},
		viewProductDetails(product) {
			this.selectedProduct = product;
		},
		clearSelectedProduct() {
			this.selectedProduct = null;
		}
	}
}
</script>

