import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GalleryView from '../views/GalleryView.vue'
import ConcertsView from '../views/ConcertsView.vue'
import MerchView from '../views/MerchView.vue'
import NewsView from '../views/NewsView.vue'
import FanArtView from '../views/FanArtView.vue'
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'

const routes = [
	{ path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
	{ path: '/concerts', name: 'concerts', component: ConcertsView, meta: { title: 'Concerts' } },
	{ path: '/gallery', name: 'gallery', component: GalleryView, meta: { title: 'Gallery' } },
	{ path: '/merch', name: 'merch', component: MerchView, meta: { title: 'Merch' } },
	{ path: '/news', name: 'news', component: NewsView, meta: { title: 'News' } },
	{ path: '/fanart', name: 'fanart', component: FanArtView, meta: { title: 'Fan Art' } },
	{ path: '/wishlist', name: 'wishlist', component: WishlistView, meta: { title: 'Wishlist' } },
	{ path: '/cart', name: 'cart', component: CartView, meta: { title: 'Cart' } }
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0, left: 0 }
	}
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'Hatsune Miku'
	next()
})

export default router
