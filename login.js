document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); 

      // Lấy giá trị tài khoản và mật khẩu 
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Hiển thị thông báo đăng nhập thành công
      alert('Đăng nhập thành công! Xin chào, ' + username);

      window.location.href = 'logined.html';
  });
});
