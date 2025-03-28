<template>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>Về chúng tôi</h3>
          <p>Cung cấp các sản phẩm nông sản sạch, an toàn và chất lượng cao đến tay người tiêu dùng.</p>
        </div>
  
        <div class="footer-section">
          <h3>Liên hệ</h3>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <font-awesome-icon icon="fa-map-marker-alt" />
              123 Đường ABC, Quận XYZ, TP.HCM
            </li>
            <li>
              <i class="fas fa-phone"></i>
              <font-awesome-icon icon="fa-phone" />
              0123.456.789
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <font-awesome-icon icon="fa-envelope" />
              contact@nongsanstore.com
            </li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Chính sách</h3>
          <ul>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Chính sách vận chuyển</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Điều khoản dịch vụ</a></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h3>Theo dõi chúng tôi</h3>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i><font-awesome-icon icon="fa-brands fa-facebook" /></a>
            <a href="#"><i class="fab fa-instagram"></i><font-awesome-icon icon="fa-brands fa-instagram" /></a>
            <a href="#"><i class="fab fa-youtube"></i><font-awesome-icon icon="fa-brands fa-youtube" /></a>
            <a href="#"><i class="fab fa-twitter"></i><font-awesome-icon icon="fa-brands fa-twitter" /></a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p>&copy; 2024 Nông Sản Store. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  </template>
  <script>
  export default {
    name: 'AppFooter'
  }
  </script>
  
  <style scoped>
  .footer {
    background: #333;
    color: white;
    padding: 50px 0 20px;
    margin-top: 50px;
  }
  
  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .footer-section h3 {
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section ul li i {
    margin-right: 10px;
  }
  
  .footer-section a {
    color: white;
    text-decoration: none;
  }
  
  .footer-section a:hover {
    text-decoration: underline;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-links a {
    width: 35px;
    height: 35px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-links a:hover {
    background: rgba(255,255,255,0.2);
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  </style>