<template>
	<div class="row justify-content-center py-5">
		<div class="col-lg-8 text-center">
			<div class="wip-container p-5 shadow-sm rounded-4 bg-white border-0">
				<div class="wip-icon-wrapper mb-4">
					<i class="bi bi-cone-striped display-1 text-miku-primary"></i>
				</div>
				<h2 class="fw-bold mb-3">Work In Progress</h2>
				<p class="text-muted mb-4 fs-5">
					This section is currently under construction. Our vocaloids are working hard to bring you the best experience!
				</p>
				<div class="progress mb-4" style="height: 10px;">
					<div 
						class="progress-bar progress-bar-striped progress-bar-animated bg-miku" 
						role="progressbar" 
						style="width: 40%"
					></div>
				</div>
				<router-link to="/" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
					<i class="bi bi-house-door me-2"></i> Back to Home
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WorkInProgress'
}
</script>