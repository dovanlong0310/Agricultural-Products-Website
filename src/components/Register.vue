<template>
    <div class="register-container">
      <h1>Đăng ký tài khoản</h1>
      
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <input 
            id="username"
            v-model="username" 
            type="text" 
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            required
            placeholder="Nhập địa chỉ email"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            required
            placeholder="Nhập mật khẩu"
          />
          <div class="password-strength" :class="passwordStrengthClass"></div>
        </div>
  
        <div class="form-group">
          <label for="address">Địa chỉ</label>
          <input 
            id="address"
            v-model="address" 
            type="text" 
            required
            placeholder="Nhập địa chỉ của bạn"
          />
        </div>
  
        <div class="form-group">
          <label for="phone">Số điện thoại</label>
          <input 
            id="phone"
            v-model="phone" 
            type="tel" 
            required
            placeholder="Nhập số điện thoại"
          />
        </div>
  
        <button type="submit" class="submit-btn">
          Đăng ký
        </button>
      </form>
  
      <div class="form-footer">
        Đã có tài khoản? 
        <router-link to="/login">Đăng nhập ngay</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'RegisterStore',
    setup() {
      const store = useStore();
      const router = useRouter();
      const username = ref('');
      const email = ref('');
      const password = ref('');
      const address = ref('');
      const phone = ref('');
  
      const register = async () => {
        await store.dispatch('register', { username: username.value, email: email.value, password: password.value, address: address.value, phone: phone.value });
        router.push('/login');
      };
  
      return {
        username,
        email,
        password,
        address,
        phone,
        register,
      };
    },
  };
  </script>
  
  <style scoped>
.register-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 30px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-weight: 500;
  font-size: 0.95em;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
  outline: none;
}

input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 5px;
  position: absolute;
  bottom: -20px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9em;
  color: #7f8c8d;
}

.form-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.form-footer a:hover {
  color: #2980b9;
}

.loading {
  opacity: 0.7;
  pointer-events: none;
}

.loading .submit-btn {
  position: relative;
}

.loading .submit-btn::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .register-container {
    margin: 20px;
    padding: 20px;
  }

  h1 {
    font-size: 1.8em;
  }

  input {
    padding: 10px;
  }

  .submit-btn {
    padding: 12px;
  }
}

.password-strength {
  height: 4px;
  margin-top: 8px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-weak {
  background-color: #e74c3c;
  width: 33%;
}

.strength-medium {
  background-color: #f1c40f;
  width: 66%;
}

.strength-strong {
  background-color: #2ecc71;
  width: 100%;
}
</style>