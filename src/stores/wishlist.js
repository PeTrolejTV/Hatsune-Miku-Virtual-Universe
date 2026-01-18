import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
	state: () => ({
		favConcertIds: JSON.parse(localStorage.getItem('miku_favorite_concerts') || '[]'),
		favProductIds: JSON.parse(localStorage.getItem('favorite_products') || '[]')
	}),

	getters: {
		isConcertFavorite: (state) => (id) => state.favConcertIds.includes(id),
		isProductFavorite: (state) => (id) => state.favProductIds.includes(id),
		hasItems: (state) => state.favConcertIds.length > 0 || state.favProductIds.length > 0
	},

	actions: {
		toggleConcertFavorite(id) {
			const index = this.favConcertIds.indexOf(id);
			if (index > -1) {
				this.favConcertIds.splice(index, 1);
			} else {
				this.favConcertIds.push(id);
			}
			this.saveToLocalStorage('concerts');
		},

		toggleProductFavorite(id) {
			const index = this.favProductIds.indexOf(id);
			if (index > -1) {
				this.favProductIds.splice(index, 1);
			} else {
				this.favProductIds.push(id);
			}
			this.saveToLocalStorage('products');
		},

		cleanupExpiredConcert(id) {
			this.favConcertIds = this.favConcertIds.filter(favId => favId !== id);
			this.saveToLocalStorage('concerts');
		},

		clearSection(type) {
			if (type === 'concerts') this.favConcertIds = [];
			else this.favProductIds = [];
			this.saveToLocalStorage(type);
		},

		saveToLocalStorage(type) {
			if (type === 'concerts') {
				localStorage.setItem('miku_favorite_concerts', JSON.stringify(this.favConcertIds));
			} else {
				localStorage.setItem('favorite_products', JSON.stringify(this.favProductIds));
			}
		}
	}
})
