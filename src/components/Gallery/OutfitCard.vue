<template>
	<div v-if="resolvedOutfit" class="outfit-card-wrapper h-100">
		<div class="outfit-card" @click="showDetail = true">
			<div class="outfit-image-wrapper">
				<img :src="resolvedOutfit.image" :alt="resolvedOutfit.name" class="outfit-image" />
				<div class="outfit-overlay">
					<div class="overlay-content">
						<h5 class="text-white mb-2">{{ resolvedOutfit.name }}</h5>
						<p class="text-white-50 small mb-3">{{ resolvedOutfit.description }}</p>
						<button class="btn btn-light btn-sm fw-bold">
							<i class="bi bi-zoom-in me-1"></i>View Details
						</button>
					</div>
				</div>
			</div>
			
			<div class="outfit-info">
				<h6 class="outfit-name mb-1">{{ resolvedOutfit.name }}</h6>
				
				<div class="outfit-event text-muted small">
					<i class="bi bi-music-note me-1"></i>{{ resolvedOutfit.event }}
				</div>
				<div class="outfit-year text-muted small mb-2">
					<i class="bi bi-calendar-event me-1"></i>{{ resolvedOutfit.year }}
				</div>

				<div class="outfit-tags">
					<span v-for="tag in resolvedOutfit.tags" :key="tag" class="badge bg-primary me-1 text-capitalize">
						{{ tag }}
					</span>
				</div>
			</div>
		</div>

		<OutfitDetail
			v-if="showDetail"
			:outfit="resolvedOutfit"
			@close="showDetail = false"
		/>
	</div>
</template>

<script>
import OutfitDetail from '@/components/Gallery/OutfitDetail.vue'
import { outfitsData } from '@/data/outfits.js'

export default {
	name: 'OutfitCard',
	components: {
		OutfitDetail
	},
	props: {
		outfit: {
			type: Object,
			default: null
		},
		outfitId: {
			type: [Number, String],
			default: null
		}
	},
	data() {
		return {
			showDetail: false
		}
	},
	computed: {
		resolvedOutfit() {
			if (this.outfit) return this.outfit;
			if (this.outfitId) {
				return outfitsData.find(o => o.id === Number(this.outfitId));
			}
			return null;
		}
	},
	watch: {
		showDetail(newVal) {
			if (this.resolvedOutfit) {
				document.title = newVal 
					? `Gallery Outfit - ${this.resolvedOutfit.name} | Miku Universe`
					: 'Gallery | Miku Universe';
			}
		}
	}
}
</script>
