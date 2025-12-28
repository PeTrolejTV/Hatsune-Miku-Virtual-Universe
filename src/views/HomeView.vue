<template>
	<div class="home-view">
		<section class="hero-section">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
						<h1 class="display-2 fw-bold mb-3 hero-title">
							Welcome to
							<span class="text-primary">Hatsune Miku</span>
							Virtual Universe
						</h1>
						
						<p class="lead text-muted mb-4">
							Your ultimate destination for virtual concerts, exclusive merch, 
							and the vibrant Miku community!
						</p>
						
						<div class="d-flex gap-3 justify-content-center justify-content-lg-start">
							<RouterLink to="/concerts" class="btn btn-primary btn-lg">
								<i class="bi bi-calendar-event me-2"></i>View Concerts
							</RouterLink>
							<RouterLink to="/merch" class="btn btn-outline-primary btn-lg">
								<i class="bi bi-shop me-2"></i>Browse Merch
							</RouterLink>
						</div>
					</div>
					
					<div class="col-lg-6">
						<img 
							src="/images/outfits/hero-miku.png" 
							alt="Hatsune Miku"
							class="img-fluid hero-image"
						/>
					</div>
				</div>
			</div>
		</section>

		<section class="features-section py-5">
			<div class="container">
				<h2 class="text-center mb-5">What We Offer</h2>
				
				<div class="row g-4">
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-music-note-list display-4 text-primary"></i>
							</div>
							<h4>Virtual Concerts</h4>
							<p class="text-muted">
								Experience immersive virtual concerts from anywhere in the world
							</p>
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-images display-4 text-primary"></i>
							</div>
							<h4>Outfit Gallery</h4>
							<p class="text-muted">
								Browse through stunning stage outfits and costumes
							</p>
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-bag-heart display-4 text-primary"></i>
							</div>
							<h4>Exclusive Merch</h4>
							<p class="text-muted">
								Shop official merchandise and limited edition items
							</p>
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-newspaper display-4 text-primary"></i>
							</div>
							<h4>Latest News</h4>
							<p class="text-muted">
								Stay updated with the latest Miku news and announcements
							</p>
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-palette display-4 text-primary"></i>
							</div>
							<h4>Fan Art Gallery</h4>
							<p class="text-muted">
								Share and discover amazing fan art from the community
							</p>
						</div>
					</div>
					
					<div class="col-md-4">
						<div class="feature-card text-center p-4">
							<div class="feature-icon mb-3">
								<i class="bi bi-heart display-4 text-primary"></i>
							</div>
							<h4>Personal Wishlist</h4>
							<p class="text-muted">
								Save your favorite concerts and products for later
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="stats-section py-5 text-white">
			<div class="container">
				<div class="row text-center g-4">
					<div class="col-md-3 col-6">
						<div class="stat-item">
							<h2 class="display-4 fw-bold">{{ stats.concerts }}+</h2>
							<p class="mb-0">Virtual Concerts</p>
						</div>
					</div>
					<div class="col-md-3 col-6">
						<div class="stat-item">
							<h2 class="display-4 fw-bold">{{ stats.products }}+</h2>
							<p class="mb-0">Merch Items</p>
						</div>
					</div>
					<div class="col-md-3 col-6">
						<div class="stat-item">
							<h2 class="display-4 fw-bold">{{ stats.fans }}K+</h2>
							<p class="mb-0">Global Fans</p>
						</div>
					</div>
					<div class="col-md-3 col-6">
						<div class="stat-item">
							<h2 class="display-4 fw-bold">{{ stats.artworks }}+</h2>
							<p class="mb-0">Fan Artworks</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="cta-section py-5">
			<div class="container text-center">
				<h2 class="mb-3">Join the Miku Community Today!</h2>
				<p class="lead text-muted mb-4">
					Discover concerts, collect merch, and connect with fans worldwide
				</p>
				<RouterLink to="/concerts" class="btn btn-primary btn-lg">
					Get Started
					<i class="bi bi-arrow-right ms-2"></i>
				</RouterLink>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	
	data() {
		return {
			stats: {
				concerts: 50,
				products: 200,
				fans: 500,
				artworks: 1000
			}
		}
	}
}
</script>
