<template>
  <div class="login-container">
    <h1>Đăng nhập</h1>

    <form @submit.prevent="login">
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
        <label for="password">Mật khẩu</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Nhập mật khẩu"
        />
      </div>

      <button type="submit" class="submit-btn">
        Đăng nhập
      </button>
    </form>

    <div class="form-footer">
      Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginStore',
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const login = async (event) => {
      try {
        event.preventDefault()
        await store.dispatch('login', { username: username.value, password: password.value });
        console.log(store.getters.isAdmin)
        if (store.getters.isAdmin) {
          router.push('/admin'); 
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
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

@media (max-width: 600px) {
  .login-container {
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
</style>