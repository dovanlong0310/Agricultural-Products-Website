<template>
    <div class="about-container">
      <section class="hero">
        <div class="hero-content">
          <h1>Giới thiệu về Nông sản Tươi</h1>
          <p>Chúng tôi là cầu nối giữa nông trại và bàn ăn, mang đến cho bạn những sản phẩm nông sản tươi ngon, chất lượng và an toàn nhất.</p>
        </div>
      </section>
  
      <section class="mission">
        <h2>Sứ mệnh của chúng tôi</h2>
        <p>Nông sản Tươi cam kết cung cấp các sản phẩm nông sản tươi sống, đảm bảo chất lượng từ nông trại đến tay người tiêu dùng. Chúng tôi hợp tác chặt chẽ với các hộ nông dân địa phương, áp dụng các quy trình sản xuất hiện đại và kiểm soát chất lượng nghiêm ngặt để mang đến những sản phẩm tốt nhất cho sức khỏe của bạn.</p>
      </section>
  
      <section class="values">
        <h2>Giá trị cốt lõi</h2>
        <ul>
          <li><b>Chất lượng:</b>  Ưu tiên hàng đầu của chúng tôi là chất lượng sản phẩm. Chúng tôi cam kết mang đến những sản phẩm tươi ngon, đạt chuẩn vệ sinh an toàn thực phẩm.</li>
          <li><b>Tươi ngon:</b> Sản phẩm được thu hoạch và vận chuyển nhanh chóng để đảm bảo độ tươi ngon tối đa.</li>
          <li><b>An toàn:</b>  Chúng tôi tuân thủ nghiêm ngặt các quy định về an toàn thực phẩm, không sử dụng hóa chất độc hại.</li>
          <li><b>Hỗ trợ nông dân:</b> Chúng tôi hợp tác và hỗ trợ các hộ nông dân địa phương, góp phần phát triển nền nông nghiệp bền vững.</li>
        </ul>
      </section>
  
      <section class="contact">
        <h2>Liên hệ với chúng tôi</h2>
        <p>Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào, vui lòng liên hệ với chúng tôi qua:</p>
        <ul>
          <li>Điện thoại: 0123456789</li>
          <li>Email: info@nongsantuoi.com</li>
          <li>Địa chỉ: 123 Đường ABC, Thành phố XYZ</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutStore',
  };
  </script>
  
  <style scoped>
  .about-container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .hero {
    background-color: #f0f0f0;
    padding: 40px 0;
    text-align: center;
  }
  
  .hero h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  section {
    margin-bottom: 30px;
  }
  
  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 1.7em;
    }
    h2 {
      font-size: 1.3em;
    }
  }
  </style>