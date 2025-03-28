<template>
  <div v-if="isAdmin" class="admin-panel">
    <h1>Quản trị viên</h1>

    <div class="section">
      <h2>Quản lý sản phẩm</h2>
      <div v-for="product in products" :key="product.id" class="item-card">
        <div class="item-info">
          <p>{{ product.name }}</p>
        </div>
        <div class="item-actions">
          <button class="btn-warning" @click="editProduct(product.id)">Sửa</button>
          <button class="btn-danger" @click="deleteProduct(product.id)">Xóa</button>
        </div>
      </div>
      <button class="add-product-btn" @click="addProduct">Thêm sản phẩm mới</button>
    </div>

    <div class="section">
      <h2>Quản lý đơn hàng</h2>
      <div v-for="order in orders" :key="order.id" class="item-card">
        <div class="item-info">
          <p>Mã đơn hàng: {{ order.id }}</p>
          <p>Trạng thái: <span :class="`status-badge status- ${order.status.toLowerCase()}`">{{ order.status }}</span></p>
        </div>
        <div class="item-actions">
          <button class="btn-success" @click="updateOrderStatus(order.id, 'Đã giao')">Đánh dấu đã giao</button>
          <button class="btn-danger" @click="updateOrderStatus(order.id, 'Đã hủy')">Đánh dấu đã hủy</button>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Quản lý người dùng</h2>
      <div v-for="user in users" :key="user.id" class="item-card">
        <div class="item-info">
          <p>{{ user.username }}</p>
        </div>
        <div class="item-actions">
          <button
            :class="user.active ? 'btn-danger' : 'btn-success'"
            @click="toggleUserStatus(user.id)"
          >
            {{ user.active ? 'Khóa' : 'Kích hoạt' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AdminPanel',
  setup() {
    const store = useStore();
    const products = ref([]);
    const orders = ref([]);
    const users = ref([]);
    const isAdmin = computed(() => store.getters.isAdmin);

    onMounted(() => {
      store.dispatch('fetchProducts').then(() => {
        products.value = store.state.products;
      });
      store.dispatch('fetchOrders').then(() => {
        orders.value = store.state.orders;
      });
      store.dispatch('fetchUsers').then(() => {
        users.value = store.state.users;
      });
    });

    const addProduct = () => {
      const newProduct = {
        name: 'Sản phẩm mới',
        description: 'Mô tả sản phẩm mới',
        price: 0,
        imageUrl: 'default.jpg',
        category: 'Danh mục mới',
        brand: 'Thương hiệu mới',
        rating: 0,
      };
      store.dispatch('addProduct', newProduct).then(() => {
        store.dispatch('fetchProducts').then(() => {
          products.value = store.state.products;
        });
      });
    };

    const editProduct = (productId) => {
      const product = products.value.find((p) => p.id === productId);
      if (product) {
        const updatedProduct = { ...product };
        updatedProduct.name = prompt('Tên sản phẩm:', product.name) || product.name;
        updatedProduct.description =
          prompt('Mô tả sản phẩm:', product.description) || product.description;
        updatedProduct.price = parseInt(prompt('Giá sản phẩm:', product.price)) || product.price;
        updatedProduct.imageUrl = prompt('URL hình ảnh:', product.imageUrl) || product.imageUrl;
        updatedProduct.category = prompt('Danh mục:', product.category) || product.category;
        updatedProduct.brand = prompt('Thương hiệu:', product.brand) || product.brand;
        updatedProduct.rating = parseFloat(prompt('Đánh giá:', product.rating)) || product.rating;

        store.dispatch('updateProduct', updatedProduct).then(() => {
          store.dispatch('fetchProducts').then(() => {
            products.value = store.state.products;
          });
        });
      }
    };

    const deleteProduct = (productId) => {
      store.dispatch('deleteProduct', productId).then(() => {
        store.dispatch('fetchProducts').then(() => {
          products.value = store.state.products;
        });
      });
    };

    const updateOrderStatus = (orderId, status) => {
      const order = orders.value.find((o) => o.id === orderId);
      if (order) {
        store.dispatch('updateOrderStatus', { orderId, status }).then(() => {
          store.dispatch('fetchOrders').then(() => {
            orders.value = store.state.orders;
          });
        });
      }
    };

    const toggleUserStatus = (userId) => {
      store.dispatch('toggleUserStatus', userId).then(() => {
        store.dispatch('fetchUsers').then(() => {
          users.value = store.state.users;
        });
      });
    };

    return {
      products,
      orders,
      users,
      isAdmin,
      addProduct,
      editProduct,
      deleteProduct,
      updateOrderStatus,
      toggleUserStatus,
    };
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin: 30px 0 20px;
}

.section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
  .admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin: 30px 0 20px;
}

.section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-info {
  flex-grow: 1;
}

.item-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-warning {
  background-color: #f1c40f;
  color: white;
}

.btn-warning:hover {
  background-color: #f39c12;
}

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.btn-success:hover {
  background-color: #27ae60;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 500;
}

.status-pending {
  background-color: #f1c40f;
  color: white;
}

.status-delivered {
  background-color: #2ecc71;
  color: white;
}

.status-cancelled {
  background-color: #e74c3c;
  color: white;
}

.add-product-btn {
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.add-product-btn:hover {
  background-color: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .item-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: flex-start;
  }

  button {
    padding: 6px 12px;
    font-size: 0.9em;
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

.section {
  animation: fadeIn 0.5s ease-out;
}
</style>