<template>
	<div class="modal modal-backdrop" v-if="product" @click.self="closeAndReset">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content product-modal-content">
				<div class="product-modal-header">
					<button class="btn-close btn btn-light" @click="closeAndReset">
						<i class="bi bi-x-lg"></i>
					</button>
				</div>
				
				<div class="modal-body">
					<h5 class="modal-title mb-3">{{ product.name }}</h5>
					<img :src="product.image" :alt="product.name" class="img-fluid rounded mb-3 modal-image-style" />
					
					<p><strong>Category:</strong> {{ product.category }}</p>
					<p class="mb-2"><strong>Price:</strong> {{ product.price }}€</p>
					
					<div class="mb-4">
						<p v-if="currentStock > 0" class="alert alert-success d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-check-circle-fill me-2"></i>
							<span v-if="selectedSize">Stock for {{ selectedSize }}:</span>
							<span v-else>In Stock:</span>
							<strong class="ms-2">{{ currentStock }}</strong>
						</p>
						<p v-else class="alert alert-danger d-inline-flex align-items-center p-2 m-0">
							<i class="bi bi-x-circle-fill me-2"></i>
							<strong>{{ selectedSize ? 'SIZE ' + selectedSize + ' SOLD OUT' : 'SOLD OUT' }}</strong>
						</p>
					</div>
					
					<div v-if="product.category === 'Clothing'" class="mb-4">
						<strong class="d-block mb-2">Size:</strong>
						<div class="btn-group">
							<button
								v-for="size in availableSizes"
								:key="size"
								class="btn btn-outline-primary"
								:class="{ active: selectedSize === size }"
								:disabled="getStockBySize(size) === 0"
								@click="selectedSize = size"
							>
								{{ size }}
							</button>
						</div>
					</div>
					
					<QuantityControl
						v-if="currentStock > 0"
						v-model:value="amount"
						:min="1"
						:max="currentStock"
						class="mb-4"
					/>
					
					<p class="mb-0">{{ product.description }}</p>
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
						:disabled="isAddDisabled"
					>
						<span v-if="currentStock > 0">
							<i class="bi bi-cart-plus me-2"></i>
							Add {{ amount }} item(s) <span v-if="selectedSize">({{ selectedSize }})</span>
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
import QuantityControl from '@/components/Common/QuantityControl.vue'
import { useCartStore } from '@/stores/cart'
import { useMerchStore } from '@/stores/merch'

export default {
	name: 'ProductDetail',
	components: { 
		QuantityControl 
	},
	props: {
		product: { 
			type: Object, 
			required: true 
		}
	},
	emits: ['close'],
	data() {
		return {
			amount: 1,
			selectedSize: null,
			availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
		}
	},
	computed: {
		cartStore() {
			return useCartStore();
		},
		merchStore() {
			return useMerchStore();
		},
		currentStock() {
			if (!this.product) return 0;
			if (this.product.category !== 'Clothing') return this.product.stock || 0;
			if (!this.selectedSize) return 0;
			return this.getStockBySize(this.selectedSize);
		},
		isAddDisabled() {
			if (this.currentStock <= 0) return true;
			if (this.product.category === 'Clothing' && !this.selectedSize) return true;
			return this.amount < 1 || this.amount > this.currentStock;
		}
	},
	watch: {
		product: {
			immediate: true,
			handler(val) {
				if (!val) return;
				this.amount = 1;
				if (val.category === 'Clothing') {
					this.selectedSize = null;
					for (const size of this.availableSizes) {
						if (this.getStockBySize(size) > 0) {
							this.selectedSize = size;
							break;
						}
					}
				}
			}
		},
		selectedSize() {
			this.amount = 1;
		}
	},
	mounted() {
		document.body.style.overflow = 'hidden'
	},
	beforeUnmount() {
		document.body.style.overflow = ''
	},
	methods: {
		getStockBySize(size) {
			return this.product.stockBySize ? this.product.stockBySize[size] : 0;
		},
		addToCartHandler() {
			if (!this.isAddDisabled) {
				this.cartStore.addItem({
					id: this.product.id,
					name: this.product.name,
					price: this.product.price,
					amount: this.amount,
					size: this.selectedSize,
					type: 'product'
				});

				this.merchStore.updateStock({
					id: this.product.id,
					size: this.selectedSize,
					amount: -this.amount
				});

				this.closeAndReset();
			}
		},
		closeAndReset() {
			this.amount = 1;
			this.selectedSize = null;
			this.$emit('close');
		}
	}
}
</script>
