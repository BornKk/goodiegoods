document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn không cho gửi form ngay lập tức

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  // Kiểm tra dữ liệu đầu vào
  if (!name || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
  }

  if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
  }

  // Hiển thị modal thành công
  const modal = document.getElementById("success-modal");
  modal.style.display = "block";

  // Đóng modal khi nhấn nút đóng
  const closeModal = document.getElementById("close-modal");
  closeModal.addEventListener("click", function () {
      modal.style.display = "none";
  });

  // Đóng modal khi nhấn bên ngoài
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});
