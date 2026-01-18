<template>
	<div class="news-view">
		<div class="container py-5">
			<div class="text-center mb-5">
				<h1 class="display-4 fw-bold mb-3">
					<i class="bi bi-newspaper me-3"></i>
					News & Articles
				</h1>
				<p class="lead text-muted">
					Stay updated with the latest Hatsune Miku news and announcements
				</p>
			</div>

			<NewsFilter @update-results="setFilteredArticles" />

			<div v-if="displayArticles.length > 0" class="row g-4">
				<div v-for="article in displayArticles" :key="article.id" class="col-md-6 col-lg-4">
					<NewsCard :article="article" />
				</div>
			</div>

			<div v-else class="text-center py-5">
				<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
				<h3 class="mt-3 text-secondary">No news articles found.</h3>
			</div>
		</div>
	</div>
</template>

<script>
import NewsCard from '@/components/NewsArticles/NewsCard.vue'
import NewsFilter from '@/components/NewsArticles/NewsFilter.vue'

export default {
	name: 'NewsView',
	components: {
		NewsCard,
		NewsFilter
	},
	data() {
		return {
			displayArticles: []
		}
	},
	methods: {
		setFilteredArticles(results) {
			this.displayArticles = results;
		}
	}
}
</script>
