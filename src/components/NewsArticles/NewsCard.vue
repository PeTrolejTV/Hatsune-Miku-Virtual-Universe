<template>
	<div v-if="resolvedArticle" class="card news-article shadow-sm h-100">
		<div class="article-image-wrapper">
			<img :src="resolvedArticle.image" :alt="resolvedArticle.title" class="article-image" />
			<span class="badge article-category-badge position-absolute top-0 end-0 m-3 shadow-sm">
				{{ resolvedArticle.category }}
			</span>
		</div>
		
		<div class="card-body p-3 d-flex flex-column">
			<div class="article-meta mb-2 text-muted small opacity-75">
				<span><i class="bi bi-calendar3 me-1"></i>{{ formatDate(resolvedArticle.date) }}</span>
				<span class="ms-2"><i class="bi bi-clock me-1"></i>{{ resolvedArticle.readTime }} min</span>
			</div>
			
			<h3 class="article-title h6 mb-2">
				{{ resolvedArticle.title }}
			</h3>
			
			<p class="article-excerpt mb-3">
				{{ excerpt }}
			</p>
			
			<div class="article-footer mt-auto">
				<button @click="openDetail" class="btn btn-sm btn-miku-fill rounded-pill px-3 fw-medium">
					Read More <i class="bi bi-arrow-right ms-1"></i>
				</button>
			</div>
		</div>

		<Teleport to="body">
			<div v-if="showDetail" class="news-detail-overlay">
				<div class="container bg-white py-5 min-vh-100 shadow-lg">
					<NewsDetail 
						:article="resolvedArticle" 
						@back="closeDetail" 
					/>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script>
import { newsData } from '@/data/news.js'
import NewsDetail from '@/components/NewsArticles/NewsDetail.vue'

export default {
	name: 'NewsCard',
	components: {
		NewsDetail
	},
	props: {
		article: {
			type: Object,
			default: null
		},
		articleId: {
			type: [Number, String],
			default: null
		}
	},
	data() {
		return {
			showDetail: false
		}
	},
	computed: {
		resolvedArticle() {
			if (this.article) return this.article;
			if (this.articleId) {
				return newsData.find(a => a.id === Number(this.articleId));
			}
			return null;
		},
		excerpt() {
			if (!this.resolvedArticle?.content) return '';
			return this.resolvedArticle.content.substring(0, 120) + '...';
		}
	},
	methods: {
		formatDate(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'short', 
				day: 'numeric' 
			});
		},
		openDetail() {
			sessionStorage.setItem('news-scroll-pos', window.scrollY);
			this.showDetail = true;
			document.body.style.overflow = 'hidden';
			window.scrollTo(0, 0);
		},
		closeDetail() {
			this.showDetail = false;
			document.body.style.overflow = '';
			
			this.$nextTick(() => {
				const savedPos = sessionStorage.getItem('news-scroll-pos');
				if (savedPos) {
					window.scrollTo(0, parseInt(savedPos));
				}
			});
		}
	}
}
</script>
