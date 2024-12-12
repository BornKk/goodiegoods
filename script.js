// SwiperJS initialization
const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtn = document.querySelector('.add-to-cart-btn');

  addToCartBtn.addEventListener('click', function() {
      const quantityInput = document.getElementById('quantity');
      const quantity = parseInt(quantityInput.value);

      if (quantity > 0) {
          // Giả lập thêm sản phẩm vào giỏ hàng
          alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
      } else {
          alert('Vui lòng chọn số lượng hợp lệ.');
      }
  });
});
