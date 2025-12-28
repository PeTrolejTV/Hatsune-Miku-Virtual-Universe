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
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { title: 'Home - Hatsune Miku Virtual Universe' }
    },
    {
        path: '/concerts',
        name: 'concerts',
        component: ConcertsView,
        meta: { title: 'Virtual Concerts' }
    },
    {
        path: '/gallery',
        name: 'gallery',
        component: GalleryView,
        meta: { title: 'Outfit Gallery' }
    },
    {
        path: '/merch',
        name: 'merch',
        component: MerchView,
        meta: { title: 'Merch Store' }
    },
    {
        path: '/news',
        name: 'news',
        component: NewsView,
        meta: { title: 'News & Articles' }
    },
    {
        path: '/fanart',
        name: 'fanart',
        component: FanArtView,
        meta: { title: 'Fan Art Gallery' }
    },
    {
        path: '/wishlist',
        name: 'wishlist',
        component: WishlistView,
        meta: { title: 'My Wishlist' }
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView,
        meta: { title: 'Shopping Cart' }
    }
]

const router = createRouter({
	// Hash história pre bezproblémové fungovanie na GitHub Pages
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	}
})

// Zmena titulku stránky podľa meta údajov
router.beforeEach((to, from, next) => {
	document.title = to.meta.title || 'Hatsune Miku Virtual Universe'
	next()
})

export default router
