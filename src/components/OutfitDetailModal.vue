<template>
    <div class="modal-backdrop" @click.self="closeModal">
        <div class="outfit-modal">
            <div class="outfit-modal-header">
                <button class="btn-close btn btn-light" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <div class="modal-content-inner p-4 p-md-5">
                <div class="modal-image-col">
                    <img :src="outfit.image" :alt="outfit.name" class="outfit-image-full" />
                </div>
                
                <div class="modal-info-col">
                    <h2 class="display-6 fw-bold mb-2 outfit-title">{{ outfit.name }}</h2>
                    
                    <p class="text-muted small mb-3">
                        <i class="bi bi-calendar-event me-2"></i>Debut: 
                        <strong class="text-dark">{{ outfit.event }}</strong>
                    </p>

                    <h4 class="mt-4 mb-2">Costume Lore & Details</h4>
                    <p class="text-secondary detail-text">
                        {{ outfit.description }}
                        
                        <span v-if="!outfit.longLore">
                            This stunning costume was crafted specifically for the <strong>{{ outfit.event }}</strong> event. 
                            It combines modern fabrics with classic Miku elements, resulting in a design that is both futuristic and nostalgic. 
                            The color palette focuses on vibrant tones of {{ getRandomColor() }} to capture the energy of the performance.
                        </span>
                        <span v-else>{{ outfit.longLore }}</span>
                    </p>

                    <div class="mt-4">
                        <span 
                            v-for="tag in outfit.tags" 
                            :key="tag" 
                            class="badge bg-primary rounded-pill me-2 text-capitalize"
                        >
                            {{ tag }}
                        </span>
                    </div>

                    <button class="btn btn-outline-primary mt-5" @click="closeModal">
                        <i class="bi bi-arrow-left me-1"></i> Back to Gallery
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OutfitDetailModal',
    props: {
        outfit: {
            type: Object,
            required: true,
            validator: (v) => v.id && v.name && v.image
        }
    },
    emits: ['close'],
    methods: {
        getRandomColor() {
            const colors = ['Turquoise', 'Pink', 'Neon Blue', 'Silver', 'Gold']
            return colors[Math.floor(Math.random() * colors.length)]
        },
        closeModal() {
            this.$emit('close')
        }
    }
}
</script>