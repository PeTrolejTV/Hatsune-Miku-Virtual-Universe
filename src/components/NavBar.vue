<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
		<div class="container">
			<RouterLink to="/" class="navbar-brand d-flex align-items-center">
				<i class="bi bi-music-note-list me-2 fs-4"></i>
				<span class="fw-bold">Miku Universe</span>
			</RouterLink>

			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<RouterLink to="/" class="nav-link" active-class="active">
							<i class="bi bi-house-door me-1"></i>Home
						</RouterLink>
					</li>

					<li class="nav-item">
						<RouterLink to="/gallery" class="nav-link" active-class="active">
							<i class="bi bi-images me-1"></i>Gallery
						</RouterLink>
					</li>

					<li class="nav-item">
						<RouterLink to="/concerts" class="nav-link" active-class="active">
							<i class="bi bi-calendar-event me-1"></i>Concerts
						</RouterLink>
					</li>

					<li class="nav-item">
						<RouterLink to="/merch" class="nav-link" active-class="active">
							<i class="bi bi-shop me-1"></i>Merch
						</RouterLink>
					</li>

					<li class="nav-item">
						<RouterLink to="/wishlist" class="nav-link position-relative" active-class="active">
							<i class="bi bi-heart me-1"></i>Wishlist
						</RouterLink>
					</li>

					<li class="nav-item">
						<RouterLink to="/cart" class="nav-link position-relative" active-class="active">
							<i class="bi bi-cart me-1"></i>Cart
						</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
}
</script>

<style scoped>
.navbar {
	padding: 1rem 0;
	background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%) !important;
}

.navbar-brand {
	font-size: 1.5rem;
	transition: transform 0.3s ease;
}

.navbar-brand:hover {
	transform: scale(1.05);
}

.nav-link {
	margin: 0 0.5rem;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	transition: all 0.3s ease;
	position: relative;
	color: rgba(255, 255, 255, 0.8) !important;
}

.nav-link:hover {
	background-color: rgba(255, 255, 255, 0.1);
	transform: translateY(-2px);
	color: #fff !important;
}

.nav-link.active {
	background-color: rgba(255, 255, 255, 0.2);
	font-weight: 600;
	color: #fff !important;
}

.badge {
	font-size: 0.65rem;
	padding: 0.25rem 0.5rem;
}

@media (max-width: 1000px) {
	.nav-link {
		margin: 0.25rem 0;
	}
}
</style>
