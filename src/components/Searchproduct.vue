<template>
    <div class="search-results">
        <h1>Kết quả tìm kiếm cho: "{{ searchQuery }}"</h1>
        <div v-if="results.length" class="products-grid">
            <div v-for="product in results" :key="product.id" class="product-card">
                <img 
                    :src="getProductImage(product.imageUrl)" 
                    :alt="product.name"
                    class="product-image"
                />
                <div class="product-info">
                    <h2 class="product-name">{{ product.name }}</h2>
                    <p class="product-description">{{ product.description }}</p>
                    <p class="product-price">{{ product.price.toLocaleString() }} VND</p>
                    <router-link :to="`/product/${product.id}`" class="detail-link">Xem chi tiết</router-link>
                </div>
            </div>
        </div>
        <div v-else class="empty-state">Không tìm thấy sản phẩm nào</div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const imageMap = {
    'caingot.jpg': require('@/assets/caingot.jpg'),
    'cachua.jpg': require('@/assets/cachua.jpg'),
    'bapcai.jpg': require('@/assets/bapcai.jpg'),
    'khoailang.jpg': require('@/assets/khoailang.jpg'),
    'camsanh.jpg': require('@/assets/camsanh.jpg'),
    'xoai.jpg': require('@/assets/xoai.jpg'),
    'buoi.jpg': require('@/assets/buoi.jpg'),
    'gaost25.jpg': require('@/assets/gaost25.jpg'),
    'chanh.jpg': require('@/assets/chanh.jpg'),
    'daucove.jpg': require('@/assets/daucove.jpg'),
};

export default {
    name: 'SearchProduct',
    setup() {
        const store = useStore();
        const route = useRoute();
        const searchQuery = route.query.search || '';
        const results = computed(() => store.getters.searchResults);
        const getProductImage = (imageUrl) => {
            return imageMap[imageUrl] || '';
        };

        return { results, searchQuery, getProductImage };
    }
};
</script>

<style scoped>
.search-results {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #2c3e50;
    font-size: 2.5em;
    margin-bottom: 40px;
    font-weight: 600;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

.product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    position: relative;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 20px;
}

.product-name {
    font-size: 1.2em;
    color: #2c3e50;
    margin-bottom: 10px;
}

.product-description {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 15px;
    height: 3.6em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.product-price {
    font-size: 1.3em;
    color: #e74c3c;
    font-weight: 600;
    margin-bottom: 15px;
}

.detail-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.3s ease;
}

.detail-link:hover {
    background-color: #2980b9;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
}

@media (max-width: 768px) {
    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 30px;
    }
}
</style>