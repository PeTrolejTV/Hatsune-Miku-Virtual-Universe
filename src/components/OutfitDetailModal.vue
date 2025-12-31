<template>
	<div class="modal-backdrop" @click.self="closeModal">
		<div class="outfit-modal">
			<div class="outfit-modal-header">
				<button class="btn-close btn btn-light" @click="closeModal">
					<i class="bi bi-x-lg"></i>
				</button>
			</div>

			<div class="modal-content-inner p-4 p-md-5">
				<div class="modal-image-col">
					<img :src="outfit.image" :alt="outfit.name" class="outfit-image-full" />
				</div>
				
				<div class="modal-info-col">
					<h2 class="display-6 fw-bold mb-2 outfit-title text-primary">{{ outfit.name }}</h2>
					
					<div class="mb-1">
						<i class="bi bi-music-note me-2"></i>Event: 
						<strong class="text-dark">{{ outfit.event }}</strong>
					</div>
					<div class="mb-3">
						<i class="bi bi-calendar-check me-2"></i>Year: 
						<strong class="text-dark">{{ outfit.year }}</strong>
					</div>

					<h4 class="mt-4 mb-2">Costume Lore & Details</h4>
					<p class="text-secondary detail-text">
						{{ outfit.description }}
					</p>
					<p v-if="outfit.longLore" class="text-secondary detail-text mt-3">
						{{ outfit.longLore }}
					</p>

					<div class="mt-4">
						<span v-for="tag in outfit.tags" :key="tag" class="badge bg-primary rounded-pill me-2 text-capitalize">
							{{ tag }}
						</span>
					</div>

					<button class="btn btn-outline-primary mt-5" @click="closeModal">
						<i class="bi bi-arrow-left me-1"></i> Back to Gallery
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OutfitDetailModal',
	props: {
		outfit: { type: Object, required: true }
	},
	emits: ['close'],
	mounted() {
		document.body.style.overflow = 'hidden';
	},
	unmounted() {
		document.body.style.overflow = '';
	},
	methods: {
		closeModal() { this.$emit('close') }
	}
}
</script>
