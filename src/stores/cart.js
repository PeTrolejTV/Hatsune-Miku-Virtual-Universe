import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: JSON.parse(localStorage.getItem('miku_cart_items') || '[]')
	}),

	getters: {
		totalItems: (state) => state.items.reduce((acc, item) => acc + item.amount, 0),
		totalPrice: (state) => state.items.reduce((acc, item) => acc + (item.amount * item.price), 0)
	},

	actions: {
		addItem(item) {
			const uniqueId = item.size ? `${item.type}-${item.id}-${item.size}` : `${item.type}-${item.id}`;
			const existingItem = this.items.find(i => i.uniqueId === uniqueId);

			if (existingItem) {
				existingItem.amount += item.amount;
			} else {
				this.items.push({
					...item,
					uniqueId,
					amount: item.amount
				});
			}
			this.saveToLocalStorage();
		},

		removeItem(uniqueId) {
			const index = this.items.findIndex(i => i.uniqueId === uniqueId);
			if (index !== -1) {
				const item = this.items[index];
				this.items.splice(index, 1);
				this.saveToLocalStorage();
				return item;
			}
			return null;
		},

		clearCart() {
			const itemsBeforeClear = [...this.items];
			this.items = [];
			this.saveToLocalStorage();
			return itemsBeforeClear;
		},

		saveToLocalStorage() {
			localStorage.setItem('miku_cart_items', JSON.stringify(this.items));
		}
	}
})
