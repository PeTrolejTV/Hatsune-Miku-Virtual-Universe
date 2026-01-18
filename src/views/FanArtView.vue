<template>
	<div class="fanart-view">
		<div class="container py-5">
			
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-palette me-3"></i>
					Fan Art Gallery
				</h1>
				<p class="lead text-muted">
					Share your creativity with the Miku community
				</p>
			</div>
			
			<WorkInProgress />

		</div>
	</div>
</template>

<script>
import WorkInProgress from '@/components/Common/WorkInProgress.vue'

export default {
	name: 'FanArtView',
	components: {
		WorkInProgress
	}
}
</script>
