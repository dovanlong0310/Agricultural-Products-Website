<template>
  <div class="order-history-container">
    <h1>Lịch sử mua hàng</h1>

    <div v-if="user">
      <div v-if="orders && orders.length">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <span class="order-id">Mã đơn hàng: #{{ order.id }}</span>
            <span class="order-date">{{ new Date(order.orderDate).toLocaleDateString() }}</span>
            <span :class="['order-status', `status-${order.status.toLowerCase()}`]">
              {{ order.status }}
            </span>
          </div>

          <div class="order-items">
            <div v-for="item in order.items" :key="item.productId" class="order-item">
              <img v-if="item.product && item.product.image" :src="item.product.image" alt="Product Image" class="item-image" @error="imageError(item.product.image)">
              <div class="item-details">
                <span class="item-name">{{ item.product?.name }}</span>
                <span class="item-quantity">x {{ item.quantity }}</span>
              </div>
              <span class="item-price">{{ item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</span>
            </div>

            <div class="order-total">
              Tổng cộng:
              <span class="total-amount">{{ order.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Không có lịch sử mua hàng.</p>
      </div>
    </div>
    <div v-else>
      <p>Vui lòng đăng nhập để xem lịch sử mua hàng.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    orders() {
      const userOrders = this.$store.getters.orders.filter(order => order.userId === this.user?.id);
      return userOrders.map(order => ({
        ...order,
        items: order.items.map(item => {
          const product = this.$store.state.products.find(p => p.id === item.productId);
          return {
            ...item,
            product: product || {}
          };
        })
      }));
    }
  },
  mounted() {
    this.$store.dispatch('fetchOrders');
  },
  methods: {
    imageError(image) {
      console.error(`Image failed to load: ${image}`);
    }
  }
};
</script>

<style scoped>
.order-history-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.order-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-id {
  font-weight: bold;
}

.order-date {
  color: #555;
}

.order-status {
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
  text-transform: capitalize;
}

.status-đã giao {
  background-color: #28a745;
  color: white;
}

.status-pending {
  background-color: #ffc107;
  color: black;
}

.status-đã hủy {
  background-color: #dc3545;
  color: white;
}

.order-items {
  margin-top: 10px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 50px;
  height: 50px;
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 10px;
}

.item-details {
  display: flex;
}

.item-name {
  font-weight: bold;
}

.item-quantity {
  margin-left: 10px;
  color: #555;
}

.item-price {
  font-weight: bold;
}

.order-total {
  margin-top: 10px;
  font-weight: bold;
  text-align: right;
}
</style>