<template>
  <div class="checkout-container">
    <h1>Đặt hàng</h1>

    <div class="checkout-steps">
      <h2>Bước 1: Điền thông tin giao hàng</h2>
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="fullName">Họ và tên</label>
          <input type="text" id="fullName" v-model="shippingInfo.fullName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="shippingInfo.email" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Số điện thoại</label>
          <input type="tel" id="phoneNumber" v-model="shippingInfo.phoneNumber" required>
        </div>
        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <textarea id="address" v-model="shippingInfo.address" required></textarea>
        </div>

        <h2>Bước 2: Chọn phương thức thanh toán</h2>
        <div class="form-group">
          <label for="paymentMethod">Chọn phương thức thanh toán</label>
          <select id="paymentMethod" v-model="paymentMethod" required>
            <option value="credit_card">Thẻ tín dụng</option>
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
            <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
          </select>
        </div>
        <div class="form-group" v-if="paymentMethod === 'credit_card'">
          <label for="cardNumber">Số thẻ tín dụng</label>
          <input type="text" id="cardNumber" v-model="cardNumber" required>
        </div>
        <div class="form-group" v-if="paymentMethod === 'bank_transfer'">
          <label for="bankAccount">Số tài khoản ngân hàng</label>
          <input type="text" id="bankAccount" v-model="bankAccount" required>
        </div>

        <h2>Tóm tắt đơn hàng</h2>
      <div class="order-summary">
        <div v-for="item in cartItems" :key="item.id" class="order-item">
          <img :src="getProductImage(item.product.imageUrl)" :alt="item.product.name" class="order-item-image" />
          <div class="order-item-details">
            <h3 class="order-item-name">{{ item.product.name }}</h3>
            <p class="order-item-price">{{ item.product?.price?.toLocaleString() ?? 0 }} VND</p>
            <p class="order-item-quantity">Số lượng: {{ item.quantity }}</p>
          </div>
        </div>
        <div class="order-summary-total">
          <p>Tổng tiền: {{ totalPrice.toLocaleString() }} VND</p>
          <p v-if="discountAmount > 0">Giảm giá: {{ discountAmount.toLocaleString() }} VND</p>
          <p>Thành tiền: {{ (totalPrice - discountAmount).toLocaleString() }} VND</p>
        </div>
      </div>

      <button type="submit" class="checkout-button">Đặt hàng</button>
    </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'CheckoutStore',
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.getters.user);

    const shippingInfo = ref({
      fullName: user.value ? user.value.username : '',
      email: user.value ? user.value.email : '',
      phoneNumber: user.value ? user.value.phone : '',
      address: user.value ? user.value.address : '',
    });

    const cartItems = computed(() => store.getters.cart);
    const totalPrice = computed(() => store.getters.cartTotal);
    const discountAmount = computed(() => store.state.discountAmount || 0);

    const imageMap = {
      'caingot.jpg': require('@/assets/caingot.jpg'),
      'cachua.jpg': require('@/assets/cachua.jpg'),
      'bapcai.jpg': require('@/assets/bapcai.jpg'),
      'camsanh.jpg': require('@/assets/camsanh.jpg'),
      'daucove.jpg': require('@/assets/daucove.jpg'),
      'khoailang.jpg': require('@/assets/khoailang.jpg'),
      'buoi.jpg': require('@/assets/buoi.jpg'),
      'chanh.jpg': require('@/assets/chanh.jpg'),
      'xoai.jpg': require('@/assets/xoai.jpg'),
      'gaost25.jpg': require('@/assets/gaost25.jpg'),
    };

    const getProductImage = (imageUrl) => {
      return imageMap[imageUrl] || require('@/assets/default.jpg');
    };

    const submitOrder = async () => {
      if (!user.value) {
        alert("Vui lòng đăng nhập để đặt hàng.");
        router.push('/login');
        return;
      }
      try {
        const orderData = {
          userId: user.value.id,
          items: cartItems.value.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          totalAmount: totalPrice.value,
          discountAmount: discountAmount.value,
          finalAmount: totalPrice.value - discountAmount.value,
          shippingAddress: shippingInfo.value.address,
          name: shippingInfo.value.fullName,
          email: shippingInfo.value.email,
          phone: shippingInfo.value.phoneNumber,
          status: 'pending',
          orderDate: new Date().toISOString(),
        };

        const response = await axios.post('http://localhost:3000/orders', orderData);
        if (response.status === 201) {
          store.commit('setCart', []);
          store.commit('setDiscount', 0);
          router.push('/');
        }
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    };

    onMounted(() => {
      if (!user.value) {
        router.push('/login');
      }
    });

    return {
      shippingInfo,
      cartItems,
      totalPrice,
      discountAmount,
      getProductImage,
      submitOrder,
    };
  },
};
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 30px;
  font-weight: 600;
}

.checkout-steps {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

textarea {
  resize: vertical;
  height: 100px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

.order-summary {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.order-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.order-item-details {
  flex: 1;
}

.order-item-name {
  font-size: 1.2em;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.order-item-price {
  font-size: 1.1em;
  color: #666;
  margin-bottom: 5px;
}

.order-item-quantity {
  font-size: 0.9em;
  color: #666;
}

.order-summary-total {
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 20px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #3498db;
  color: white;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-button:hover {
  background-color: #2980b9;
}
</style>