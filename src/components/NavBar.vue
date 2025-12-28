<template>
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow">
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
	name: 'NavBar',
}
</script>
