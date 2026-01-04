<template>
	<div class="card news-article shadow-sm h-100">
		<div class="article-image-wrapper">
			<img :src="article.image" :alt="article.title" class="article-image" />
			<span class="badge article-category-badge position-absolute top-0 end-0 m-3 shadow-sm">
				{{ article.category }}
			</span>
		</div>
		
		<div class="card-body p-3 d-flex flex-column">
			<div class="article-meta mb-2 text-muted small opacity-75">
				<span><i class="bi bi-calendar3 me-1"></i>{{ formatDate(article.date) }}</span>
				<span><i class="bi bi-clock me-1"></i>{{ article.readTime }} min</span>
			</div>
			
			<h3 class="article-title h6 mb-2">
				{{ article.title }}
			</h3>
			
			<p class="article-excerpt mb-3">
				{{ article.content }}
			</p>
			
			<div class="article-footer">
				<button @click="handleReadMore" class="btn btn-sm btn-miku-fill rounded-pill px-3 fw-medium">
					Read More <i class="bi bi-arrow-right ms-1"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewsCard',
	props: {
		article: {
			type: Object,
			required: true
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
		handleReadMore() {
			sessionStorage.setItem('news-scroll-pos', window.scrollY);
			this.$emit('read-more', this.article);
		}
	}
}
</script>