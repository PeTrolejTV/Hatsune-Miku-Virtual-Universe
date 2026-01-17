<template>
	<div class="not-found-view d-flex align-items-center justify-content-center text-center py-5">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8">
					<div class="error-card p-5 shadow-lg rounded-4">
						<h1 class="display-1 fw-bolder text-miku mb-3">404</h1>
						<h2 class="display-5 fw-bold text-secondary mb-4">Page Not Found</h2>
						<p class="lead text-muted mb-4">
							Oh no! It seems Hatsune Miku got a little lost during her last performance.
							The page you're looking for might be in another dimension!
						</p>
						
						<div class="miku-illustration mb-5">
							<i class="bi bi-mic-mute display-2 text-miku-dark opacity-50"></i>
						</div>

						<p class="text-muted mb-4">
							Let's get you back to where the music plays.
						</p>
						
						<RouterLink to="/" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
							<i class="bi bi-house-door-fill me-2"></i> Go to Home
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NotFoundView'
}
</script>
