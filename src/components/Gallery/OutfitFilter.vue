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
			<label class="form-label small fw-bold text-muted">Search Outfits</label>
			<div class="input-group">
				<span class="input-group-text bg-light border-end-0">
					<i class="bi bi-search"></i>
				</span>
				<input 
					v-model="searchQuery" 
					type="text" 
					class="form-control bg-light border-start-0" 
					placeholder="Original Miku..."
				>
			</div>
		</div>

		<div class="filter-item platform-field">
			<label class="form-label small fw-bold text-muted">Release Year</label>
			<select v-model="selectedYear" class="form-select bg-light">
				<option value="">All Years</option>
				<option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
			</select>
		</div>

		<div class="filter-item platform-field">
			<label class="form-label small fw-bold text-muted">Category / Tag</label>
			<select v-model="selectedTag" class="form-select bg-light text-capitalize">
				<option value="">All Styles</option>
				<option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OutfitFilter',
	props: {
		allOutfits: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			searchQuery: '',
			selectedYear: '',
			selectedTag: ''
		}
	},
	computed: {
		uniqueYears() {
			const years = [...new Set(this.allOutfits.map(o => o.year))];
			return years.sort((a, b) => b - a);
		},
		uniqueTags() {
			const tags = this.allOutfits.flatMap(o => o.tags);
			return [...new Set(tags)].sort();
		},
		filteredResults() {
			return this.allOutfits
				.filter(o => {
					const q = this.searchQuery.toLowerCase();
					const matchesSearch = 
						o.name.toLowerCase().includes(q) || 
						o.event.toLowerCase().includes(q) || 
						o.description.toLowerCase().includes(q) || 
						(o.longLore && o.longLore.toLowerCase().includes(q));
					
					const matchesYear = this.selectedYear === '' || o.year === parseInt(this.selectedYear);
					const matchesTag = this.selectedTag === '' || o.tags.includes(this.selectedTag);
					
					return matchesSearch && matchesYear && matchesTag;
				})
				.sort((a, b) => b.year - a.year);
		}
	},
	watch: {
		filteredResults: {
			immediate: true,
			handler(newVal) {
				this.$emit('update-results', newVal);
			}
		}
	},
	methods: {
		resetFilters() {
			this.searchQuery = '';
			this.selectedYear = '';
			this.selectedTag = '';
		}
	}
}
</script>