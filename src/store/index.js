import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    products: [],
    cart: [],
    user: null,
    roles: [],
    users: [
      { id: '5', username: 'admin', password: '123', role: 'admin', email: 'vanlong@gmail.com' },
      { id: '1', username: 'user1', password: '123', role: 'user', email: 'vanlong1@gmail.com' },
      { id: '2', username: 'user2', password: '123', role: 'user', email: 'vanlong2@gmail.com' },
      { id: '3', username: 'user3', password: '123', role: 'user', email: 'vanlong3@gmail.com' },
      { id: '4', username: 'user4', password: '123', role: 'user', email: 'vanlong4@gmail.com' },
    ],
    orders: [],
    currentUser: null,
    searchResults: [],
    searchQuery: '',
    discountAmount: 0,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setUser(state, user) {
      state.user = user;
    },
    setDiscount(state, discountAmount) {
      state.discountAmount = discountAmount;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setOrders(state, orders) {
      state.orders = orders;
      state.cart = [];
    },
    logout(state) {
        state.user = null;
        state.cart = [];
    },
    SET_SEARCH_RESULTS(state, searchResults) {
      state.searchResults = searchResults;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await axios.get('http://localhost:3000/products');
      commit('setProducts', response.data);
    },
    applyDiscount({ commit, state }, discountCode) {
      const discounts = {
        'DISCOUNT10': 0.1,
        'DISCOUNT20': 0.2,
        'DISCOUNT30': 0.3
      };

      let discountAmount = 0;
      if (discounts[discountCode]) {
        discountAmount = state.cart.reduce((total, item) => total + (item.product?.price * item.quantity), 0) * discounts[discountCode];
        commit('setDiscount', discountAmount);
      } else {
        commit('setDiscount', 0);
        alert('Mã giảm giá không hợp lệ');
      }
    },

    async fetchCart({ commit, state }) {
      try {
        let cartItems = [];
        
        if (state.user) {
          const userId = state.user.id;
          const cartResponse = await axios.get(`http://localhost:3000/cartItems?userId=${userId}`);
          cartItems = cartResponse.data;
  
          const guestCartItems = await axios.get('http://localhost:3000/cartItems?userId=null');
          if (guestCartItems.data.length > 0) {
            guestCartItems.data.forEach(async (item) => {
              await axios.post('http://localhost:3000/mergeCart', {
                userId: state.user.id,
                guestCartItems: [item]
              });
            });
            const newCartResponse = await axios.get(`http://localhost:3000/cartItems?userId=${userId}`);
            cartItems = newCartResponse.data;
          }
        } else {
          const cartResponse = await axios.get('http://localhost:3000/cartItems?userId=null');
          cartItems = cartResponse.data;
        }
    
        cartItems = cartItems.map(cartItem => {
          const product = state.products.find(p => p.id === cartItem.productId);
          return {
            ...cartItem,
            product: product || null
          };
        });
        
        commit('setCart', cartItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
        commit('setCart', []);
      }
    },
    async fetchUsers({ commit }) {
      const response = await axios.get('http://localhost:3000/users');
      commit('setUsers', response.data);
    },
    async fetchOrders({ commit }) {
      const response = await axios.get('http://localhost:3000/orders');
      commit('setOrders', response.data);
    },
    async fetchOrderHistory({ commit }, userId) {
      try {
        const response = await axios.get(`http://localhost:3000/orders=${userId}`);
        commit('setOrders', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch order history:', error);
      }
    },
    async login({ commit, dispatch }, { username, password }) {
      try {
        const user = this.state.users.find(u => u.username === username && u.password === password);
        if (user) {
          commit('setUser', user);
        } else {
          throw new Error('Invalid username or password');
        }
    
        const guestCartItems = await axios.get('http://localhost:3000/cartItems?userId=null');
        if (guestCartItems.data.length > 0) {
          await axios.post('http://localhost:3000/mergeCart', {
            userId: user.id,
            guestCartItems: guestCartItems.data
          });
        }
    
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
    async logout({ commit }) {
        commit('logout');
    },
  
    async register({ commit }, userDetails) {
        try {
          const response = await axios.post('http://localhost:3000/register', userDetails);
          commit('setUser', response.data);
        } catch (error) {
          console.error('User already exists');
        }
    },
    async addToCart({ dispatch, state }, { productId, quantity }) {
      try {
        const product = state.products.find(p => p.id === productId);
        if (!product) {
          throw new Error('Sản phẩm không tồn tại');
        }
    
        let userId = null;
        if (state.user) {
          userId = state.user.id;
        }
    
        const existingItem = state.cart.find(
          item => (!item.userId && !userId && item.productId === productId) || (userId && item.userId === userId && item.productId === productId)
        );
    
        if (existingItem) {
          await axios.put(`http://localhost:3000/cartItems/${existingItem.id}`, {
            ...existingItem,
            quantity: existingItem.quantity + quantity
          });
        } else {
          await axios.post('http://localhost:3000/cartItems', {
            userId,
            productId,
            quantity
          });
        }
    
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    },
    async removeFromCart({ commit }, cartItemId) {
      try {
        await axios.delete(`http://localhost:3000/cartItems/${cartItemId}`);
        const userId = this.state.user ? this.state.user.id : null;
        const response = await axios.get(`http://localhost:3000/cartItems?userId=${userId}`);
        const cartItems = await Promise.all(response.data.map(async (item) => {
          const productResponse = await axios.get(`http://localhost:3000/products/${item.productId}`);
          return { ...item, product: productResponse.data };
        }));
        commit('setCart', cartItems);
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    },
    async updateCartItem({ dispatch }, item) {
      try {
    
        if (!item.id || !item.productId) {
          throw new Error('Thiếu thông tin sản phẩm hoặc ID');
        }
    
        await axios.put(`http://localhost:3000/cartItems/${item.id}`, {
          productId: item.productId,
          quantity: item.quantity,
          userId: item.userId || null,
        });
    
        console.log('Item updated on server');
    
        await dispatch('fetchCart')
      } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
      }
    },
    async updateOrderStatus({ commit }, { orderId, status }) {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, { status });
      const ordersResponse = await axios.get('http://localhost:3000/orders');
      commit('setOrders', ordersResponse.data);
    },
    async toggleUserStatus({ commit }, userId) {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const updatedUser = { ...response.data, active: !response.data.active };
      await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
      const usersResponse = await axios.get('http://localhost:3000/users');
      commit('setUsers', usersResponse.data);
    },
    async deleteProduct({ commit }, productId) {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      const response = await axios.get('http://localhost:3000/products');
      commit('setProducts', response.data);
    },
    async addProduct({ commit }, product) {
      await axios.post('http://localhost:3000/products', product);
      const response = await axios.get('http://localhost:3000/products');
      commit('setProducts', response.data);
    },
    async updateProduct({ commit }, product) {
      await axios.put(`http://localhost:3000/products/${product.id}`, product);
      const response = await axios.get('http://localhost:3000/products');
      commit('setProducts', response.data);
    },
    async searchProducts({ commit }, query) {
      try {
        const response = await axios.get(`http://localhost:3000/products?search=${query}`);
        commit('SET_SEARCH_RESULTS', response.data); // Lưu kết quả tìm kiếm vào state
        commit('SET_SEARCH_QUERY', query);
      } catch (error) {
        console.error("Error searching products:", error);
        throw error;
      }
    },
  },
  getters: {
    products: (state) => state.products,
    cart: (state) => state.cart,
    cartTotal: state => {
        return state.cart.reduce((total, item) => {
          const price = item.product?.price || 0;
          return total + (price * item.quantity);
        }, 0)},
    user: (state) => state.user,
    users: (state) => state.users,
    orders: (state) => state.orders,
    userRoles: (state) => state.userRoles,
    currentUser: state => state.currentUser,
    isAdmin: state => state.user && state.user.role === 'admin',
    searchQuery: state => state.searchQuery,
    searchResults: (state) => {
      const query = state.searchQuery.toLowerCase();
      return state.products.filter(product => product.name.toLowerCase().includes(query));
    }
  },
});

export default store;