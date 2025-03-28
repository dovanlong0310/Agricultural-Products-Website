<template>
    <div class="account-container">
      <h1>Tài Khoản</h1>
      <div v-if="user">
        <h2>Chỉnh sửa thông tin tài khoản</h2>
        <div>
          <label for="username">Họ và tên:</label>
          <input type="text" id="username" v-model="user.username" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" />
        </div>
        <div>
            <label for="oldPassword">Mật khẩu cũ:</label>
            <input type="password" id="oldPassword" v-model="oldPassword" />
        </div>
        <div>
            <label for="newPassword">Mật khẩu mới:</label>
            <input type="password" id="newPassword" v-model="newPassword" />
        </div>
        <button @click="saveChanges">Lưu thay đổi</button>
        <button @click="changePassword">Đổi mật khẩu</button>
        <button @click="logout">Đăng xuất</button>
      </div>
      <div v-else>
        <p>Bạn chưa đăng nhập. Vui lòng <router-link to="/login">đăng nhập</router-link> để tiếp tục</p>
      </div>
      <div v-if="changePasswordMessage" class="message">
          {{ changePasswordMessage }}
      </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'AccountPage',
  setup() {
    const store = useStore();
    const router = useRouter();
    const oldPassword = ref('');
    const newPassword = ref('');
    const changePasswordMessage = ref('');

    const user = computed({
      get: () => store.getters.user,
      set: (newUser) => {
        store.commit('updateUser', newUser);
      },
    });

    const saveChanges = () => {
      store.dispatch('updateUser', user.value).then(() => {
        alert('Thay đổi đã được lưu!');
      }).catch((error) => {
        console.error('Lỗi khi lưu thay đổi:', error);
      });
    };

    const changePassword = () => {
        store.dispatch('changePassword', {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value
        }).then((message) => {
            changePasswordMessage.value = message;
            oldPassword.value = '';
            newPassword.value = '';
        }).catch((error) => {
          changePasswordMessage.value = "Đã có lỗi xảy ra: " + error;
        });
    };


    const logout = () => {
      store.dispatch('logout');
      router.push('/login');
    };

    return {
      user,
      saveChanges,
      logout,
      oldPassword,
      newPassword,
      changePassword,
      changePasswordMessage,
    };
  },
};
</script>

<style scoped>
.account-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
}

label {
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

button:not(:last-child) {
  margin-right: 10px;
}
</style>