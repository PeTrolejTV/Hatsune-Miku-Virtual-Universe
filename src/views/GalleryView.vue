<template>
	<div class="gallery-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-images me-3"></i>Outfit Gallery
				</h1>
				<p class="lead text-muted">Explore Hatsune Miku's stunning stage outfits</p>
			</div>

			<div class="row g-3 mb-5 p-4 bg-white rounded-4 shadow-sm border">
				<div class="col-md-4">
					<label class="form-label small fw-bold text-muted">Search Outfits</label>
					<div class="input-group">
						<span class="input-group-text bg-light border-end-0"><i class="bi bi-search"></i></span>
						<input v-model="searchQuery" type="text" class="form-control bg-light border-start-0" placeholder="Original Miku..">
					</div>
				</div>

				<div class="col-md-4">
					<label class="form-label small fw-bold text-muted">Release Year</label>
					<select v-model="selectedYear" class="form-select bg-light">
						<option value="">All Years</option>
						<option v-for="year in uniqueYears" :key="year" :value="year">{{ year }}</option>
					</select>
				</div>

				<div class="col-md-4">
					<label class="form-label small fw-bold text-muted">Category / Tag</label>
					<select v-model="selectedTag" class="form-select bg-light text-capitalize">
						<option value="">All Styles</option>
						<option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
					</select>
				</div>
			</div>

			<div class="row g-4" v-if="filteredOutfits.length > 0">
				<div 
					v-for="outfit in filteredOutfits" 
					:key="outfit.id"
					class="col-lg-3 col-md-4 col-sm-6"
				>
					<OutfitCard :outfit="outfit" @outfit-click="viewOutfit" />
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No outfits found matching your filters.</h3>
				<button class="btn btn-outline-primary mt-2" @click="resetFilters">Clear all filters</button>
			</div>
		</div>
		
		<OutfitDetailModal
			v-if="selectedOutfit"
			:outfit="selectedOutfit"
			@close="selectedOutfit = null"
		/>
	</div>
</template>

<script>
import OutfitCard from '@/components/OutfitCard.vue'
import OutfitDetailModal from '@/components/OutfitDetailModal.vue'
import { outfitsData } from '@/data/outfits.js'

export default {
	name: 'GalleryView',
	components: { OutfitCard, OutfitDetailModal },
	data() {
		return {
			searchQuery: '',
			selectedYear: '',
			selectedTag: '',
			selectedOutfit: null,
			outfits: outfitsData
		}
	},
	computed: {
		uniqueYears() {
			const years = [...new Set(this.outfits.map(o => o.year))];
			return years.sort((a, b) => b - a);
		},
		uniqueTags() {
			const tags = this.outfits.flatMap(o => o.tags);
			return [...new Set(tags)].sort();
		},
		filteredOutfits() {
			return this.outfits
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
	methods: {
		viewOutfit(outfit) { this.selectedOutfit = outfit },
		resetFilters() {
			this.searchQuery = '';
			this.selectedYear = '';
			this.selectedTag = '';
		}
	}
}
</script>
