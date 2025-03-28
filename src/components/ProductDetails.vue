<template>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="product" class="product-details">
      <div class="image-section">
        <img 
          :src="getProductImage(product.imageUrl)" 
          :alt="product.name"
          class="product-image"
        />
      </div>
  
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        
        <p class="product-description">{{ product.description }}</p>
        
        <p class="product-price">{{ formatPrice(product.price) }}</p>
        
        <div class="rating-container">
          <div class="rating">
            <span class="star" v-for="n in 5" :key="n">
              ★
            </span>
            <span class="rating-value">{{ product.rating }}/5</span>
          </div>
        </div>
  
        <button 
          @click="handleAddToCart"
          class="add-to-cart-btn"
        >
          <span class="material-icons"></span>
          Thêm vào giỏ hàng
        </button>
  
        <div class="product-meta">
          <div class="meta-item">
            <span class="meta-label">Thương hiệu:</span>
            <span>{{ product.brand }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Danh mục:</span>
            <span>{{ product.category }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Tình trạng:</span>
            <span>Còn hàng</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="error">
      Không tìm thấy sản phẩm
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
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
  };
  
  export default {
    name: 'ProductDetails',
    setup() {
      const route = useRoute();
      const store = useStore();
      const product = ref(null);
      const loading = ref(true);
      const error = ref(null);
  
      const formatPrice = (price) => {
        if (!price) return '0 VND';
        return `${price.toLocaleString()} VND`;
      };
  
      const getProductImage = (imageUrl) => {
        return imageMap[imageUrl] || '';
      };
  
      const handleAddToCart = async () => {
        try {
          if (!product.value || !product.value.id) {
            throw new Error('Sản phẩm không hợp lệ');
          }
  
          await store.dispatch('addToCart', {
            productId: product.value.id,
            quantity: 1
          });
          alert('Thêm vào giỏ hàng thành công');
        } catch (err) {
          console.error('Error adding to cart:', err);
          alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
      };
  
      onMounted(async () => {
        try {
          loading.value = true;
          const productId = route.params.id;
          
          if (!productId) {
            throw new Error('Product ID is required');
          }
  
          await store.dispatch('fetchProducts');
          const foundProduct = store.getters.products.find(
            (p) => p.id.toString() === productId.toString()
          );
  
          if (!foundProduct) {
            throw new Error('Product not found');
          }
  
          product.value = foundProduct;
        } catch (err) {
          console.error('Error fetching product:', err);
          error.value = err.message || 'Có lỗi xảy ra khi tải sản phẩm';
        } finally {
          loading.value = false;
        }
      });
  
      return {
        product,
        loading,
        error,
        formatPrice,
        getProductImage,
        handleAddToCart
      };
    }
  };
  </script>
  
  <style scoped>
.product-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  animation: fadeIn 0.5s ease-out;
}

.product-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.02);
}

.product-info {
  padding: 20px;
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.2;
}

.product-description {
  color: #666;
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 30px;
}

.product-price {
  font-size: 2em;
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 20px;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}

.star {
  color: #f1c40f;
  font-size: 1.2em;
}

.rating-value {
  font-size: 1.1em;
  color: #2c3e50;
  font-weight: 500;
}

.add-to-cart-btn {
  width: 100%;
  padding: 15px 30px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.add-to-cart-btn:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

.product-meta {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #666;
}

.meta-label {
  font-weight: 500;
  margin-right: 10px;
  min-width: 100px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
  color: #e74c3c;
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

@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 15px;
  }

  .product-image {
    height: 300px;
  }

  h1 {
    font-size: 2em;
  }

  .product-price {
    font-size: 1.5em;
  }
}
</style>