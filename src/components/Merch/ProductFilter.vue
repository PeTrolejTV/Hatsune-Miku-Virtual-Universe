<template>
	<div class="filter-wrapper mb-5 p-4 bg-white rounded-4 shadow-sm border position-relative">
		<button 
			@click="resetFilters" 
			class="btn btn-reset-filters" 
			title="Reset all filters"
		>
			<i class="bi bi-arrow-counterclockwise"></i>
		</button>

		<div class="filter-item search-field">
			<label class="form-label small fw-bold text-muted">Search Products</label>
			<div class="input-group">
				<span class="input-group-text bg-light border-end-0">
					<i class="bi bi-search"></i>
				</span>
				<input 
					v-model="searchQuery" 
					type="text" 
					class="form-control bg-light border-start-0" 
					placeholder="Search..."
				>
			</div>
		</div>
		
		<div class="filter-item platform-field">
			<label class="form-label small fw-bold text-muted">Category</label>
			<select v-model="filterCategory" class="form-select bg-light">
				<option value="all">All Categories</option>
				<option value="Figures">Figures</option>
				<option value="Plushies">Plushies</option>
				<option value="Clothing">Clothing</option>
				<option value="Accessories">Accessories</option>
			</select>
		</div>
		
		<div class="filter-item sort-field">
			<label class="form-label small fw-bold text-muted">Sort by</label>
			<div class="d-flex gap-2">
				<button 
					@click="toggleSort('name')" 
					class="btn flex-grow-1 d-flex align-items-center justify-content-between text-nowrap"
					:class="sortKey === 'name' ? 'btn-miku-active' : 'btn-outline-primary'"
				>
					<span>
						<i class="bi bi-sort-alpha-down me-1"></i>
						{{ sortKey === 'name' ? (sortOrder === 'asc' ? 'A-Z' : 'Z-A') : 'Name' }}
					</span>
					<i v-if="sortKey === 'name'" :class="sortOrder === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
				</button>

				<button 
					@click="toggleSort('releaseDate')" 
					class="btn flex-grow-1 d-flex align-items-center justify-content-between text-nowrap"
					:class="sortKey === 'releaseDate' ? 'btn-miku-active' : 'btn-outline-primary'"
				>
					<span>
						<i class="bi bi-calendar-event me-1"></i>
						{{ sortKey === 'releaseDate' ? (sortOrder === 'desc' ? 'Newest' : 'Oldest') : 'Release' }}
					</span>
					<i v-if="sortKey === 'releaseDate'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
				</button>
				
				<button 
					@click="toggleSort('rating')" 
					class="btn flex-grow-1 d-flex align-items-center justify-content-between text-nowrap"
					:class="sortKey === 'rating' ? 'btn-miku-active' : 'btn-outline-primary'"
				>
					<span>
						<i class="bi bi-star me-1"></i>
						{{ sortKey === 'rating' ? (sortOrder === 'desc' ? 'Best' : 'Worst') : 'Rating' }}
					</span>
					<i v-if="sortKey === 'rating'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
				</button>
			</div>
		</div>
		
		<div class="filter-item price-field">
			<label class="form-label small fw-bold text-muted d-flex justify-content-between">
				Price Range <span class="text-miku-teal">{{ minPriceLimit }}€ - {{ maxPriceLimit }}€</span>
			</label>
			<div class="miku-slider-container">
				<div class="slider-track"></div>
				<div class="slider-range" :style="rangeStyle"></div>
				<input 
					type="range" 
					:min="absMinPrice" 
					:max="absMaxPrice" 
					v-model.number="minPriceLimit" 
					@input="validateRange"
					class="miku-range"
				>
				<input 
					type="range" 
					:min="absMinPrice" 
					:max="absMaxPrice" 
					v-model.number="maxPriceLimit" 
					@input="validateRange"
					class="miku-range"
				>
			</div>
		</div>
		
		<div class="filter-item switch-field">
			<label class="form-label small fw-bold text-muted d-block text-nowrap mb-2">Filters</label>
			<div class="d-flex flex-column gap-2">
				<div class="form-check form-switch d-flex align-items-center">
					<input 
						class="form-check-input custom-miku-switch me-2" 
						type="checkbox" 
						role="switch"
						id="hideSoldOut" 
						v-model="hideSoldOut"
					>
					<label class="form-check-label small text-muted" for="hideSoldOut">Hide Sold Out</label>
				</div>
				<div class="form-check form-switch d-flex align-items-center">
					<input 
						class="form-check-input custom-miku-switch me-2" 
						type="checkbox" 
						role="switch"
						id="showFavorites" 
						v-model="showOnlyFavorites"
					>
					<label class="form-check-label small text-muted" for="showFavorites">Show Favorites</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductFilter',
	props: {
		products: { type: Array, required: true },
		favoriteIds: { type: Array, default: () => [] }
	},
	data() {
		return {
			searchQuery: '',
			filterCategory: 'all',
			sortKey: 'name',
			sortOrder: 'asc',
			minPriceLimit: 0,
			maxPriceLimit: 1000,
			absMinPrice: 0,
			absMaxPrice: 1000,
			hideSoldOut: true,
			showOnlyFavorites: false
		}
	},
	computed: {
		rangeStyle() {
			const range = this.absMaxPrice - this.absMinPrice;
			if (range === 0) return { left: '0%', right: '0%' };
			const left = ((this.minPriceLimit - this.absMinPrice) / range) * 100;
			const right = 100 - ((this.maxPriceLimit - this.absMinPrice) / range) * 100;
			return { left: left + '%', right: right + '%' };
		},
		filteredResults() {
			let results = [...this.products];
			
			if (this.showOnlyFavorites) {
				results = results.filter(p => this.favoriteIds.includes(p.id));
			}

			if (this.filterCategory !== 'all') {
				results = results.filter(p => p.category === this.filterCategory);
			}
			
			if (this.searchQuery) {
				const query = this.searchQuery.toLowerCase();
				results = results.filter(p => 
					p.name.toLowerCase().includes(query) ||
					p.description.toLowerCase().includes(query)
				);
			}
			
			results = results.filter(p => p.price >= this.minPriceLimit && p.price <= this.maxPriceLimit);
			
			if (this.hideSoldOut) {
				results = results.filter(p => {
					const stock = p.category === 'Clothing' && p.stockBySize 
						? Object.values(p.stockBySize).reduce((a, b) => a + b, 0) 
						: p.stock;
					return stock > 0;
				});
			}
			
			results.sort((a, b) => {
				let modifier = this.sortOrder === 'asc' ? 1 : -1;
				
				if (this.sortKey === 'name') return a.name.localeCompare(b.name) * modifier;
				if (this.sortKey === 'rating') return (a.rating - b.rating) * modifier;
				
				if (this.sortKey === 'releaseDate') {
					if (this.sortOrder === 'desc') {
						if (a.isNew !== b.isNew) {
							return a.isNew ? -1 : 1;
						}
						return b.id - a.id;
					} else {
						if (a.isNew !== b.isNew) {
							return a.isNew ? 1 : -1;
						}
						return a.id - b.id;
					}
				}
				return 0;
			});
			
			return results;
		}
	},
	watch: {
		products: {
			immediate: true,
			handler() { this.initializePriceLimits(); }
		},
		filteredResults: {
			immediate: true,
			handler(newVal) { this.$emit('filter-updated', newVal); }
		}
	},
	methods: {
		initializePriceLimits() {
			if (this.products && this.products.length > 0) {
				const prices = this.products.map(p => p.price);
				this.absMinPrice = Math.floor(Math.min(...prices));
				this.absMaxPrice = Math.ceil(Math.max(...prices));
				this.minPriceLimit = this.absMinPrice;
				this.maxPriceLimit = this.absMaxPrice;
			}
		},
		validateRange() {
			if (this.minPriceLimit > this.maxPriceLimit) {
				const temp = this.minPriceLimit;
				this.minPriceLimit = this.maxPriceLimit;
				this.maxPriceLimit = temp;
			}
		},
		toggleSort(key) {
			if (this.sortKey === key) {
				this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
			} else {
				this.sortKey = key;
				this.sortOrder = key === 'name' ? 'asc' : 'desc';
			}
		},
		resetFilters() {
			this.searchQuery = '';
			this.filterCategory = 'all';
			this.sortKey = 'name';
			this.sortOrder = 'asc';
			this.minPriceLimit = this.absMinPrice;
			this.maxPriceLimit = this.absMaxPrice;
			this.hideSoldOut = true;
			this.showOnlyFavorites = false;
		}
	}
}
</script>