import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import GalleryView from '../views/GalleryView.vue'
import FanArtView from '../views/FanArtView.vue'
import ConcertsView from '../views/ConcertsView.vue'
import MerchView from '../views/MerchView.vue'
import WishlistView from '../views/WishlistView.vue'
import CartView from '../views/CartView.vue'

const routes = [
	{ path: '/', name: 'home', component: HomeView, meta: { title: 'Home | Miku Universe' } },
	{ path: '/news', name: 'news', component: NewsView, meta: { title: 'News | Miku Universe' } },
	{ path: '/gallery', name: 'gallery', component: GalleryView, meta: { title: 'Gallery | Miku Universe' } },
	{ path: '/fanart', name: 'fanart', component: FanArtView, meta: { title: 'Fan Art | Miku Universe' } },
	{ path: '/concerts', name: 'concerts', component: ConcertsView, meta: { title: 'Concerts | Miku Universe' } },
	{ path: '/merch', name: 'merch', component: MerchView, meta: { title: 'Merch | Miku Universe' } },
	{ path: '/wishlist', name: 'wishlist', component: WishlistView, meta: { title: 'Wishlist | Miku Universe' } },
	{ path: '/cart', name: 'cart', component: CartView, meta: { title: 'Cart | Miku Universe' } }
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (savedPosition) {
					resolve(savedPosition)
				} else if (to.path === from.path) {
					resolve({ top: 0, left: 0, behavior: 'smooth' })
				} else {
					resolve({ top: 0, left: 0 })
				}
			}, 150)
		})
	}
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'Hatsune Miku'
	next()
})

export default router
