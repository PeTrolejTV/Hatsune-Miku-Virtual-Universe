<template>
    <div class="gallery-view">
        <div class="container py-5">
            <div class="text-center mb-5">
                <h1 class="display-4 fw-bold mb-3">
                    <i class="bi bi-images me-3"></i>
                    Outfit Gallery
                </h1>
                <p class="lead text-muted">
                    Explore Hatsune Miku's stunning stage outfits and costumes
                </p>
            </div>

            <div class="row g-4">
                <div 
                    v-for="outfit in outfits" 
                    :key="outfit.id"
                    class="col-lg-3 col-md-4 col-sm-6"
                >
                    <OutfitCard 
                        :outfit="outfit"
                        @outfit-click="viewOutfit"
                    />
                </div>
            </div>
        </div>
        
        <OutfitDetailModal
            v-if="selectedOutfit"
            :outfit="selectedOutfit"
            @close="selectedOutfit = null"
        />
    </div>
</template>

<script>
import OutfitCard from '@/components/OutfitCard.vue'
import OutfitDetailModal from '@/components/OutfitDetailModal.vue'
import { outfitsData } from '@/data/outfits.js'

export default {
    name: 'GalleryView',
    components: {
        OutfitCard,
        OutfitDetailModal
    },
    data() {
        return {
            selectedOutfit: null,
            outfits: outfitsData
        }
    },
    methods: {
        viewOutfit(outfit) {
            this.selectedOutfit = outfit
        }
    }
}
</script>
