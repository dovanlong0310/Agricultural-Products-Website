<template>
  <div class="contact-container">
    <h1>Liên hệ với chúng tôi</h1>

    <p>Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng liên hệ với chúng tôi qua các kênh sau:</p>

    <div class="contact-methods">
      <div class="contact-method">
        <i class="fas fa-map-marker-alt"></i>
        <p>
          <strong>Địa chỉ:</strong><br>
          123 Đường ABC,<br>
          Quận 1, TP. Hồ Chí Minh
        </p>
      </div>

      <div class="contact-method">
        <i class="fas fa-phone"></i>
        <p>
          <strong>Điện thoại:</strong><br>
          <a href="tel:+84123456789">+84 123 456 789</a><br>
          <a href="tel:+84987654321">+84 987 654 321</a>
        </p>
      </div>

      <div class="contact-method">
        <i class="fas fa-envelope"></i>
        <p>
          <strong>Email:</strong><br>
          <a href="mailto:info@nongsantuoi.com">info@nongsantuoi.com</a><br>
          <a href="mailto:support@nongsantuoi.com">support@nongsantuoi.com</a>
        </p>
      </div>
    </div>


    <div class="contact-form">
      <h2>Hoặc gửi tin nhắn cho chúng tôi</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Họ tên:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="message">Nội dung:</label>
          <textarea id="message" v-model="message" rows="4" required></textarea>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ContactStore',
  setup() {
    const name = ref('');
    const email = ref('');
    const message = ref('');

    const submitForm = () => {
      console.log('Name:', name.value);
      console.log('Email:', email.value);
      console.log('Message:', message.value);

      name.value = '';
      email.value = '';
      message.value = '';
      alert('Cảm ơn bạn đã liên hệ!');
    };

    return {
      name,
      email,
      message,
      submitForm,
    };
  },
};
</script>

<style scoped>
.contact-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.contact-methods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.contact-method {
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  text-align: center;
}

.contact-method i {
  font-size: 2em;
  margin-bottom: 10px;
}

.contact-form {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .contact-methods {
    flex-direction: column;
  }
  .contact-method {
    flex-basis: 100%;
    margin-bottom: 15px;
  }
}
</style>