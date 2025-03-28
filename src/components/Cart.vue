<template>
  <div class="cart-container">
    <h1>Giỏ hàng</h1>
    
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else-if="cartItems.length" class="cart-content">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="product-info" v-if="item.product">
          <h3 class="product-name">{{ item.product.name }}</h3>
          <p class="product-price">{{ formatPrice(item.product.price) }}</p>
        </div>
        <div v-else class="product-info error">Sản phẩm không tồn tại</div>
        
        <div class="quantity-controls">
          <label>Số lượng:</label>
          <input 
            type="number" 
            :value="item.quantity"
            @change="(e) => updateQuantity(item, parseInt(e.target.value))"
            min="1"
          />
        </div>
        
        <button class="remove-btn" @click="removeItem(item.id)">Xóa</button>
        </div>
          <div class="discount-section">
            <label>Mã giảm giá:</label>
            <input type="text" v-model="discountCode" @change="applyDiscount" />
            <span v-if="discountAmount" class="discount-amount">Giảm: {{ formatPrice(discountAmount) }}</span>
          </div>
          
          <div class="total-section">
            <p>Tổng tiền: {{ formatPrice(cartTotal) }}</p>
            <p>Tổng sau giảm giá: {{ formatPrice(totalAfterDiscount) }}</p>
            <button class="checkout-btn" @click="checkout">Tiến hành thanh toán</button>
          </div>
    </div>
    
    <div v-else class="cart-empty">Giỏ hàng của bạn đang trống</div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CartStore',
  setup() {
    const store = useStore();
    const router = useRouter();
    const discountCode = ref('');
    const error = ref(null);

    const cartItems = computed(() => store.state.cart);
    const cartTotal = computed(() => store.getters.cartTotal);
    const discountAmount = computed(() => store.state.discountAmount);
    const totalAfterDiscount = computed(() => Math.max(cartTotal.value - discountAmount.value, 0));

    const formatPrice = (price) => {
      return `${(price || 0).toLocaleString()} VND`;
    };

    const updateQuantity = async (item, newQuantity) => {
      try {
        if (newQuantity < 1) return;
        await store.dispatch('updateCartItem', { ...item, quantity: newQuantity });
      } catch (err) {
        error.value = 'Không thể cập nhật số lượng';
      }
    };

    const removeItem = async (itemId) => {
      try {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
          await store.dispatch('removeFromCart', itemId);
        }
      } catch (err) {
        error.value = 'Không thể xóa sản phẩm';
      }
    };

    const applyDiscount = () => {
      store.dispatch('applyDiscount', discountCode.value);
    };

    const checkout = async () => {
      if (!store.state.user) {
        alert('Vui lòng đăng nhập để thanh toán');
        router.push('/login');
        return;
      }

      try {
        if (store.state.user) {
          const guestCartItems = store.state.cart.filter(item => !item.userId);
          if (guestCartItems.length > 0) {
            await axios.post('http://localhost:3000/mergeCart', {
              userId: store.state.user.id,
              guestCartItems
            });
            await store.dispatch('fetchCart');
          }
        }

        router.push('/checkout');
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('Có lỗi xảy ra khi gộp giỏ hàng hoặc thanh toán');
      }
    };

    onMounted(async () => {
      await store.dispatch('fetchProducts');
      await store.dispatch('fetchCart');
    });

    return {
      cartItems,
      cartTotal,
      discountCode,
      discountAmount,
      totalAfterDiscount,
      formatPrice,
      updateQuantity,
      removeItem,
      applyDiscount,
      checkout,
    };
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.loading {
  background-color: #f8f9fa;
  color: #666;
}

.error {
  background-color: #fee;
  color: #e74c3c;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 2;
}

.product-name {
  font-size: 1.2em;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.product-price {
  color: #e74c3c;
  font-weight: 500;
  font-size: 1em;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 20px;
}

input[type="number"] {
  width: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-size: 1em;
}

.remove-btn {
  padding: 10px 18px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.discount-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.discount-section label {
  font-weight: 500;
  color: #333;
}

.discount-section input[type="text"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.discount-amount, .total-price {
  margin-bottom: 10px;
  font-weight: 500;
  color: #333;
}

.total-section {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: right;
}

.checkout-btn {
  margin-top: 10px;
  padding: 12px 25px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #27ae60;
}

.cart-empty {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    text-align: center;
  }

  .quantity-controls {
    margin: 15px 0;
  }

  .remove-btn {
    width: 100%;
  }
}
</style>