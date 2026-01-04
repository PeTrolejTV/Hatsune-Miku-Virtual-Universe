<template>
	<div class="filter-wrapper mb-5 p-4 bg-white rounded-4 shadow-sm border position-relative">
		<button @click="resetFilters" class="btn btn-reset-filters" title="Reset all filters">
			<i class="bi bi-arrow-counterclockwise"></i>
		</button>

		<div class="filter-item search-field">
			<label class="form-label small fw-bold text-muted">Search News</label>
			<div class="input-group">
				<span class="input-group-text bg-light border-end-0">
					<i class="bi bi-search"></i>
				</span>
				<input 
					v-model="searchQuery"
					type="text" 
					class="form-control bg-light border-start-0" 
					placeholder="Digital Dreams..."
				>
			</div>
		</div>

		<div class="filter-item category-field">
			<label class="form-label small fw-bold text-muted">Category</label>
			<select v-model="filterCategory" class="form-select bg-light text-capitalize">
				<option value="all">All Categories</option>
				<option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
			</select>
		</div>

		<div class="filter-item date-cascading-field">
			<label class="form-label small fw-bold text-muted">Date Filter</label>
			<div class="d-flex gap-2">
				<select v-model="filterYear" class="form-select bg-light" @change="filterMonth = 'all'; filterDay = 'all'">
					<option value="all">Year</option>
					<option v-for="y in uniqueYears" :key="y" :value="y">{{ y }}</option>
				</select>
				
				<select v-if="filterYear !== 'all'" v-model="filterMonth" class="form-select bg-light" @change="filterDay = 'all'">
					<option value="all">Month</option>
					<option v-for="m in availableMonths" :key="m" :value="m">{{ m }}</option>
				</select>
				
				<select v-if="filterMonth !== 'all' && filterYear !== 'all'" v-model="filterDay" class="form-select bg-light">
					<option value="all">Day</option>
					<option v-for="d in availableDays" :key="d" :value="d">{{ d }}</option>
				</select>
			</div>
		</div>

		<div class="filter-item sort-field">
			<label class="form-label small fw-bold text-muted">Sort by Date or Read Time</label>
			<div class="d-flex gap-2">
				<button 
					@click="toggleSort('date')" 
					class="btn flex-grow-1 d-flex align-items-center justify-content-between"
					:class="sortKey === 'date' ? 'btn-miku-active' : 'btn-outline-primary'"
				>
					<span>
						<i class="bi bi-calendar3 me-2"></i>
						{{ sortKey === 'date' ? (sortOrder === 'desc' ? 'Newest' : 'Oldest') : 'Date' }}
					</span>
					<i v-if="sortKey === 'date'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
				</button>
				
				<button 
					@click="toggleSort('readTime')" 
					class="btn flex-grow-1 d-flex align-items-center justify-content-between"
					:class="sortKey === 'readTime' ? 'btn-miku-active' : 'btn-outline-primary'"
				>
					<span>
						<i class="bi bi-clock me-2"></i>
						{{ sortKey === 'readTime' ? (sortOrder === 'desc' ? 'Longest' : 'Shortest') : 'Read Time' }}
					</span>
					<i v-if="sortKey === 'readTime'" :class="sortOrder === 'desc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewsFilter',
	props: {
		allArticles: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			searchQuery: '',
			filterCategory: 'all',
			filterYear: 'all',
			filterMonth: 'all',
			filterDay: 'all',
			sortKey: 'date',
			sortOrder: 'desc'
		}
	},
	computed: {
		categories() {
			return [...new Set(this.allArticles.map(a => a.category))].sort();
		},
		uniqueYears() {
			const years = this.allArticles.map(a => a.date.split('-')[0]);
			return [...new Set(years)].sort((a, b) => b - a);
		},
		availableMonths() {
			if (this.filterYear === 'all') return [];
			const months = this.allArticles
				.filter(a => a.date.startsWith(this.filterYear))
				.map(a => a.date.split('-')[1]);
			return [...new Set(months)].sort();
		},
		availableDays() {
			if (this.filterMonth === 'all') return [];
			const days = this.allArticles
				.filter(a => a.date.startsWith(`${this.filterYear}-${this.filterMonth}`))
				.map(a => a.date.split('-')[2]);
			return [...new Set(days)].sort();
		},
		filteredArticles() {
			let results = [...this.allArticles];

			if (this.searchQuery) {
				const q = this.searchQuery.toLowerCase();
				results = results.filter(a => 
					a.title.toLowerCase().includes(q) || 
					a.content.toLowerCase().includes(q)
				);
			}

			if (this.filterCategory !== 'all') {
				results = results.filter(a => a.category === this.filterCategory);
			}

			if (this.filterYear !== 'all') {
				results = results.filter(a => a.date.startsWith(this.filterYear));
			}

			if (this.filterMonth !== 'all') {
				results = results.filter(a => a.date.split('-')[1] === this.filterMonth);
			}

			if (this.filterDay !== 'all') {
				results = results.filter(a => a.date.split('-')[2] === this.filterDay);
			}

			results.sort((a, b) => {
				let modifier = this.sortOrder === 'desc' ? -1 : 1;
				if (this.sortKey === 'date') {
					return (new Date(a.date) - new Date(b.date)) * modifier;
				}
				if (this.sortKey === 'readTime') {
					return (a.readTime - b.readTime) * modifier;
				}
				return 0;
			});

			return results;
		}
	},
	watch: {
		filteredArticles: {
			immediate: true,
			handler(newVal) {
				this.$emit('update-results', newVal);
			}
		}
	},
	methods: {
		toggleSort(key) {
			if (this.sortKey === key) {
				this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
			} else {
				this.sortKey = key;
				this.sortOrder = 'desc';
			}
		},
		resetFilters() {
			this.searchQuery = '';
			this.filterCategory = 'all';
			this.filterYear = 'all';
			this.filterMonth = 'all';
			this.filterDay = 'all';
			this.sortKey = 'date';
			this.sortOrder = 'desc';
		}
	}
}
</script>