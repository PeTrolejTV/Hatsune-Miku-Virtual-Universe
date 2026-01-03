<template>
	<nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow">
		<div class="container">
			<a href="/" class="navbar-brand d-flex align-items-center ps-3" @click.prevent="navigate('/')">
				<i class="bi bi-music-note-list me-2 fs-4"></i>
				<span class="fw-bold">Miku Universe</span>
			</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item" v-for="item in menuItems" :key="item.path">
						<a :href="item.path" class="nav-link" :class="{ active: $route.path === item.path }" @click.prevent="navigate(item.path)">
							<i :class="['bi', item.icon, 'me-1']"></i>{{ item.name }}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	data() {
		return {
			menuItems: [
				{ name: 'Home', path: '/', icon: 'bi-house-door' },
				{ name: 'Gallery', path: '/gallery', icon: 'bi-images' },
				{ name: 'Concerts', path: '/concerts', icon: 'bi-calendar-event' },
				{ name: 'Merch', path: '/merch', icon: 'bi-shop' },
				{ name: 'Wishlist', path: '/wishlist', icon: 'bi-heart' },
				{ name: 'Cart', path: '/cart', icon: 'bi-cart' }
			]
		}
	},
	methods: {
		navigate(path) {
			if (this.$route.path === path) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else {
				this.$router.push(path);
			}
			this.closeNavbar();
		},
		closeNavbar() {
			const navbarCollapse = document.getElementById('navbarNav');
			if (navbarCollapse && navbarCollapse.classList.contains('show')) {
				const toggleButton = document.querySelector('.navbar-toggler');
				if (toggleButton) toggleButton.click();
			}
		}
	}
}
</script>
