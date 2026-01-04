<template>
	<div class="gallery-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-images me-3"></i>Outfit Gallery
				</h1>
				<p class="lead text-muted">Explore Hatsune Miku's stunning stage outfits</p>
			</div>

			<OutfitFilter 
				:all-outfits="outfits" 
				@update-results="setFilteredOutfits"
				ref="filterRef"
			/>

			<div class="row g-4" v-if="displayOutfits.length > 0">
				<div 
					v-for="outfit in displayOutfits" 
					:key="outfit.id"
					class="col-lg-3 col-md-4 col-sm-6"
				>
					<OutfitCard :outfit="outfit" @outfit-click="viewOutfit" />
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No outfits found.</h3>
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
import OutfitCard from '@/components/Gallery/OutfitCard.vue'
import OutfitDetailModal from '@/components/Gallery/OutfitDetail.vue'
import OutfitFilter from '@/components/Gallery/OutfitFilter.vue'
import { outfitsData } from '@/data/outfits.js'

export default {
	name: 'GalleryView',
	components: { 
		OutfitCard, 
		OutfitDetailModal,
		OutfitFilter
	},
	data() {
		return {
			outfits: outfitsData,
			displayOutfits: [],
			selectedOutfit: null
		}
	},
	methods: {
		setFilteredOutfits(results) {
			this.displayOutfits = results;
		},
		viewOutfit(outfit) { 
			this.selectedOutfit = outfit 
		}
	}
}
</script>
