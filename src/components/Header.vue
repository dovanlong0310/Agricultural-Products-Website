<template>
    <header class="header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" alt="Logo" />
        </router-link>
  
        <nav class="nav-menu">
          <router-link to="/">Trang chủ</router-link>
          <router-link to="/product">Sản phẩm</router-link>
          <router-link to="/about">Giới thiệu</router-link>
          <router-link to="/contact">Liên hệ</router-link>
        </nav>
  
        <div class="header-actions">
          <div class="search">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button @click="handleSearch">
              <font-awesome-icon icon="fa-search" />
              <i class="fas fa-search"></i>
            </button>
          </div>
  
          <router-link to="/cart" class="cart-icon">
            <font-awesome-icon icon="fa-shopping-cart" />
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount" class="cart-count">
              {{ cartItemCount }}
            </span>
          </router-link>
  
          <div class="user-menu" v-if="user">
            <button @click="toggleUserMenu">
              <img src="../assets/default-avatar-url.png" alt="Avatar" />
            </button>
            <div v-if="showUserMenu" class="dropdown-menu">
              <router-link to="/account">Tài khoản</router-link>
              <router-link to="/order-history">Đơn hàng</router-link>
              <button @click="logout">Đăng xuất</button>
            </div>
          </div>
          <router-link v-else to="/login" class="login-btn">
            Đăng nhập
          </router-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
      name: 'AppHeader'
  }
  </script>

  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  
  const searchQuery = ref('');
  const showUserMenu = ref(false);
  
  const user = computed(() => store.getters.user);
  const cartItemCount = computed(() => store.getters.cartItemCount);
  
  watch(() => route.query.search, (newQuery) => {
    if (newQuery) {
      handleSearch();
    }
  });
  
  const handleSearch = () => {
  const trimmedQuery = searchQuery.value.trim();
  console.log(trimmedQuery)
    if (trimmedQuery) {
      store.dispatch('searchProducts', trimmedQuery)
        .then(() => {
          router.push({
            path: '/searchproduct',
            query: { search: trimmedQuery }
          });
        })
        .catch(error => {
          console.error("Error searching products:", error);
        });
    } else {
      store.commit('SET_SEARCH_RESULTS', []);
      router.push('/searchproduct');
    }
  };
  
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
  };
  
  const logout = async () => {
    await store.dispatch('logout');
    router.push('/');
  };

  </script>
  
  <style scoped>
  .header {
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo img {
    height: 40px;
  }
  
  .nav-menu {
    display: flex;
    gap: 30px;
  }
  
  .nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  
  .nav-menu a:hover,
  .nav-menu a.router-link-active {
    color: #4caf50;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .search {
    position: relative;
    width: 300px;
  }
  
  .search input {
    width: 100%;
    padding: 8px 35px 8px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
  }
  
  .search button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .cart-icon {
    position: relative;
    color: #333;
    text-decoration: none;
  }
  
  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #4caf50;
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 10px;
  }
  
  .user-menu {
    position: relative;
  }
  
  .user-menu button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .user-menu img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 150px;
  }
  
  .dropdown-menu a,
  .dropdown-menu button {
    display: block;
    padding: 8px 15px;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
  
  .dropdown-menu a:hover,
  .dropdown-menu button:hover {
    background: #f5f5f5;
  }
  
  .login-btn {
    padding: 8px 20px;
    background: #4caf50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  </style>