<template>
	<div class="full-article-view">
		<button class="btn btn-miku-outline mb-4" @click="$emit('back')">
			<i class="bi bi-arrow-left me-2"></i> Back to All Articles
		</button>
		
		<h1 class="display-5 fw-bold mb-4 article-detail-title">{{ article.title }}</h1>
		
		<div class="article-meta mb-4 text-muted small">
			<span class="badge article-category-badge me-3">{{ article.category }}</span>
			<span class="me-3"><i class="bi bi-calendar3 me-1"></i>{{ formatDate(article.date) }}</span>
			<span class="me-3"><i class="bi bi-clock me-1"></i>{{ article.readTime }} min read</span>
			<span><i class="bi bi-person-circle me-1"></i>{{ article.author }}</span>
		</div>

		<img :src="article.image" :alt="article.title" class="full-article-image mb-5" />

		<div class="article-content-body lead">
			<p v-for="(paragraph, index) in formattedParagraphs" :key="index" class="mb-4">
				{{ paragraph }}
			</p>
			
			<div class="mt-5 pt-4 border-top">
				<p class="text-end text-muted small">
					Article posted by <strong>{{ article.author }}</strong>
				</p>
			</div>
		</div>

		<button class="btn btn-miku-outline mt-4" @click="$emit('back')">
			<i class="bi bi-arrow-left me-2"></i> Back to All Articles
		</button>
	</div>
</template>

<script>
export default {
	name: 'NewsDetail',
	props: {
		article: {
			type: Object,
			required: true
		}
	},
	computed: {
		formattedParagraphs() {
			if (!this.article.content) return [];
			
			const sentences = this.article.content.match(/[^\.!\?]+[\.!\?]+/g) || [this.article.content];
			
			const paragraphs = [];
			const sentencesPerParagraph = 3;
			
			for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
				const chunk = sentences.slice(i, i + sentencesPerParagraph).join(' ');
				paragraphs.push(chunk.trim());
			}
			
			return paragraphs;
		}
	},
	methods: {
		formatDate(dateString) {
			return new Date(dateString).toLocaleDateString('en-US', { 
				year: 'numeric', 
				month: 'short', 
				day: 'numeric' 
			});
		}
	}
}
</script>