<template>
  <div class="outfit-card" @click="handleClick">
    <div class="outfit-image-wrapper">
      <img :src="outfit.image" :alt="outfit.name" class="outfit-image" />
      
      <div class="outfit-overlay">
        <div class="overlay-content">
          <h5 class="text-white mb-2">{{ outfit.name }}</h5>
          <p class="text-white-50 small mb-3">{{ outfit.description }}</p>
          <button class="btn btn-light btn-sm">
            <i class="bi bi-zoom-in me-1"></i>View Details
          </button>
        </div>
      </div>
    </div>
    
    <div class="outfit-info">
      <h6 class="outfit-name mb-1">{{ outfit.name }}</h6>
      
      <p class="outfit-event text-muted small mb-2">
        <i class="bi bi-music-note me-1"></i>{{ outfit.event }}
      </p>
      
      <div class="outfit-tags">
        <span 
          v-for="tag in outfit.tags" 
          :key="tag" 
          class="badge bg-primary me-1"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutfitCard',
  props: {
    outfit: {
      type: Object,
      required: true,
      validator: (v) => v.id && v.name && v.image
    }
  },
  emits: ['outfit-click'],
  methods: {
    handleClick() {
      this.$emit('outfit-click', this.outfit)
    }
  }
}
</script>