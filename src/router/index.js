import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../components/Cart.vue';
import Admin from '../components/Admin.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import OrderHistory from '../components/OrderHistory.vue';
import Product from '../components/Product.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Checkout from '../components/Checkout.vue'
import store from '@/store/index';
import Account from '@/components/Account.vue';
import Searchproduct from '@/components/Searchproduct.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product', name: 'Product', component: Product },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true }, },
  { path: '/login', name: 'Login', component: Login },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/about', name: 'About', component: About },
  { path: '/account', name: 'Account', component: Account },
  { path: '/searchproduct', name: 'Searchproduct', component: Searchproduct },
  { path: '/register', name: 'Register', component: Register },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/order-history', name: 'OrderHistory', component: OrderHistory },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAdmin;
  if (to.matched && to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});


export default router;