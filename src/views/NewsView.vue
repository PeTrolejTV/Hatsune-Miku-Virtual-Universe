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

			<div v-if="!selectedArticle">
				<NewsFilter 
					:all-articles="articles" 
					@update-results="setFilteredArticles"
				/>

				<div v-if="displayArticles.length > 0" class="row g-4">
					<div v-for="article in displayArticles" :key="article.id" class="col-md-6 col-lg-4">
						<NewsCard 
							:article="article"
							@read-more="readFullArticle"
						/>
					</div>
				</div>

				<div v-else class="text-center py-5">
					<i class="bi bi-search-heart display-1 text-muted opacity-25"></i>
					<h3 class="mt-3 text-secondary">No news articles found.</h3>
				</div>
			</div>

			<NewsDetail 
				v-else 
				:article="selectedArticle" 
				@back="closeArticle" 
			/>
		</div>
	</div>
</template>

<script>
import NewsCard from '@/components/NewsArticles/NewsCard.vue'
import NewsFilter from '@/components/NewsArticles/NewsFilter.vue'
import NewsDetail from '@/components/NewsArticles/NewsDetail.vue'
import { newsData } from '@/data/news.js'

export default {
	name: 'NewsView',
	components: {
		NewsCard,
		NewsFilter,
		NewsDetail
	},
	data() {
		return {
			articles: newsData,
			displayArticles: [],
			selectedArticle: null
		}
	},
	watch: {
		selectedArticle(newVal) {
			if (newVal) {
				document.title = `News - ${newVal.title} | Miku Universe`;
			} else {
				document.title = this.$route.meta.title || 'News | Miku Universe';
			}
		}
	},
	methods: {
		setFilteredArticles(results) {
			this.displayArticles = results;
		},
		readFullArticle(article) {
			document.documentElement.style.scrollBehavior = 'auto';
			this.selectedArticle = article;
			
			this.$nextTick(() => {
				window.scrollTo(0, 0);
				setTimeout(() => {
					document.documentElement.style.scrollBehavior = '';
				}, 50);
			});
		},
		closeArticle() {
			document.documentElement.style.scrollBehavior = 'auto';
			this.selectedArticle = null;

			this.$nextTick(() => {
				const savedPos = sessionStorage.getItem('news-scroll-pos');
				if (savedPos) {
					window.scrollTo(0, parseInt(savedPos));
				}
				setTimeout(() => {
					document.documentElement.style.scrollBehavior = '';
				}, 50);
			});
		}
	}
}
</script>
