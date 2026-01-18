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
				@update-results="setFilteredOutfits"
			/>

			<div class="row g-4" v-if="displayOutfits.length > 0">
				<div 
					v-for="outfit in displayOutfits" 
					:key="outfit.id"
					class="col-lg-3 col-md-4 col-sm-6"
				>
					<OutfitCard :outfit="outfit" />
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No outfits found.</h3>
			</div>
		</div>
	</div>
</template>

<script>
import OutfitCard from '@/components/Gallery/OutfitCard.vue'
import OutfitFilter from '@/components/Gallery/OutfitFilter.vue'

export default {
	name: 'GalleryView',
	components: { 
		OutfitCard, 
		OutfitFilter
	},
	data() {
		return {
			displayOutfits: []
		}
	},
	mounted() {
		document.title = 'Gallery | Miku Universe';
	},
	methods: {
		setFilteredOutfits(results) {
			this.displayOutfits = results;
		}
	}
}
</script>
