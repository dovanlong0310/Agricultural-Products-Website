<template>
    <div class="product-container">
      <div class="hero-section">
      <img src="@/assets/hero-image.jpg" alt="Hero Image" class="hero-image">
      <div class="hero-text">
        <h1>Chào mừng đến với cửa hàng của chúng tôi!</h1>
        <p>Khám phá những sản phẩm tươi ngon và chất lượng nhất.</p>
      </div>
    </div>
      <h1>Danh sách sản phẩm</h1>
  
      <div v-if="products.length" class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="price-tag">{{ product.price.toLocaleString() }} VND</div>
          <img :src="getProductImage(product.imageUrl)" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ product.price.toLocaleString() }} VND</p>
            <router-link :to="`/product/${product.id}`" class="detail-link">Xem chi tiết</router-link>
          </div>
        </div>
      </div>
  
      <div v-else class="empty-state">Không có sản phẩm nào</div>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
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
  'hero-image.jpg': require('@/assets/hero-image.jpg'),
};
  
  export default {
    name: 'HomeStore',
    setup() {
      const store = useStore();
      const products = computed(() => store.getters.products);
  
      onMounted(() => {
        store.dispatch('fetchProducts');
      });
      const getProductImage = (imageUrl) => {
        return imageMap[imageUrl] || '';
      };
  
      return {
        products,
        getProductImage,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .hero-section {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 40px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.hero-text h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-text p {
    font-size: 1.2em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .hero-section {
    height: 200px;
  }
  .hero-text h1 {
    font-size: 2em;
  }
  .hero-text p {
    font-size: 1em;
  }
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
    padding: 20px;
  }
  
  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover .product-image {
    transform: scale(1.05);
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-name {
    font-size: 1.2em;
    color: #2c3e50;
    margin-bottom: 10px;
    font-weight: 600;
    height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
  
  .loading {
    text-align: center;
    padding: 40px;
    color: #666;
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
      padding: 10px;
    }
  
    h1 {
      font-size: 2em;
      margin-bottom: 30px;
    }
  
    .product-card {
      max-width: 100%;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .product-card {
    animation: fadeIn 0.5s ease-out;
  }
  
  .price-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(231, 76, 60, 0.9);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-weight: 600;
  }
  </style>