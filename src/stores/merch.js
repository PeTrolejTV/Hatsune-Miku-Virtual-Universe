import { defineStore } from 'pinia';
import { useCartStore } from './cart';

const initialProducts = [
	{
		id: 1,
		name: 'Nendoroid Miku',
		category: 'Figures',
		price: 45.99,
		image: 'images/products/nendoroid-miku.jpg',
		description: 'Cute chibi-style poseable figure with interchangeable parts and accessories.',
		rating: 5,
		stock: 25,
		isNew: true
	},
	{
		id: 2,
		name: 'Miku Plushie Large',
		category: 'Plushies',
		price: 29.99,
		image: 'images/products/miku-plushie-large.jpg',
		description: 'Soft and huggable 40cm plushie made from high-quality, non-allergenic fabric.',
		rating: 5,
		stock: 50,
		isNew: false
	},
	{
		id: 3,
		name: 'Concert T-Shirt',
		category: 'Clothing',
		price: 24.99,
		image: 'images/products/concert-tshirt.jpg',
		description: 'Official tour merchandise T-shirt, featuring vibrant print graphics.',
		rating: 4,
		stockBySize: {
			XS: 0,
			S: 4,
			M: 6,
			L: 10,
			XL: 5,
			XXL: 0
		},
		isNew: false
	},
	{
		id: 4,
		name: 'Figma Action Figure',
		category: 'Figures',
		price: 89.99,
		image: 'images/products/figma-miku.jpeg',
		description: 'Highly articulated premium figure allowing for dynamic posing.',
		rating: 5,
		stock: 0,
		isNew: false
	},
	{
		id: 5,
		name: 'Keychain Set',
		category: 'Accessories',
		price: 12.99,
		image: 'images/products/keychain-set.jpg',
		description: 'Set of 6 acrylic keychains featuring different Miku outfits. Durable and scratch-resistant.',
		rating: 4,
		stock: 200,
		isNew: true
	}, 
	{
		id: 6,
		name: 'Hoodie Premium',
		category: 'Clothing',
		price: 59.99,
		image: 'images/products/premium-hoodie.jpg',
		description: 'High quality embroidered hoodie with subtle Miku logo details.',
		rating: 5,
		stockBySize: {
			XS: 5,
			S: 5,
			M: 5,
			L: 5,
			XL: 5,
			XXL: 5
		},
		isNew: false
	}
];

export const useMerchStore = defineStore('merch', {
	state: () => ({
		products: initialProducts,
		isInitialized: false
	}),

	getters: {
		allProducts: (state) => state.products.map(product => {
			if (product.category === 'Clothing' && product.stockBySize) {
				const total = Object.values(product.stockBySize).reduce((a, b) => a + b, 0);
				return { ...product, stock: total };
			}
			return product;
		}),
		getProductById: (state) => (id) => {
			const product = state.products.find(p => p.id === id);
			if (product && product.category === 'Clothing' && product.stockBySize) {
				const total = Object.values(product.stockBySize).reduce((a, b) => a + b, 0);
				return { ...product, stock: total };
			}
			return product;
		}
	},

	actions: {
		initializeStock() {
			if (this.isInitialized) return;
			const cartStore = useCartStore();
			
			cartStore.items.forEach(item => {
				if (item.type === 'product') {
					const product = this.products.find(p => p.id === item.id);
					if (product) {
						if (product.category === 'Clothing' && item.size && product.stockBySize) {
							product.stockBySize[item.size] -= item.amount;
							if (product.stockBySize[item.size] < 0) product.stockBySize[item.size] = 0;
						} else {
							product.stock -= item.amount;
							if (product.stock < 0) product.stock = 0;
						}
					}
				}
			});
			this.isInitialized = true;
		},
		updateStock(payload) {
			const product = this.products.find(p => p.id === payload.id);
			if (product) {
				if (product.category === 'Clothing' && payload.size && product.stockBySize) {
					product.stockBySize[payload.size] += payload.amount;
					if (product.stockBySize[payload.size] < 0) product.stockBySize[payload.size] = 0;
				} else {
					product.stock += payload.amount;
					if (product.stock < 0) product.stock = 0;
				}
			}
		}
	}
});
