// Dữ liệu mẫu
let categories = [
    { id: 1, name: "Trái Cây" },
    { id: 2, name: "Rau Củ" },
    { id: 3, name: "Ngũ Cốc" },
    { id: 4, name: "Thịt Hữu Cơ" },
    { id: 5, name: "Sữa Hữu Cơ" },
    { id: 6, name: "Gia Vị Hữu Cơ" },
    { id: 7, name: "Hạt Dinh Dưỡng" },
    { id: 8, name: "Thực Phẩm Đông Lạnh Hữu Cơ" },
    { id: 9, name: "Đồ Ăn Nhẹ Hữu Cơ" },
    { id: 10, name: "Mật Ong Hữu Cơ" },
    { id: 11, name: "Nước Ép Hữu Cơ" },
    { id: 12, name: "Bột & Ngũ Cốc Hữu Cơ" },
    { id: 13, name: "Trà & Cà Phê Hữu Cơ" },
    { id: 14, name: "Sản Phẩm Chay Hữu Cơ" },
    { id: 15, name: "Dầu Ăn Hữu Cơ" },
    { id: 16, name: "Đồ Uống Hữu Cơ" },
    { id: 17, name: "Thực Phẩm Tươi Hữu Cơ" },
    { id: 18, name: "Đồ Biển Hữu Cơ" },
    { id: 19, name: "Thực Phẩm Cho Bé Hữu Cơ" },
    { id: 20, name: "Bánh & Kẹo Hữu Cơ" },
];


// Lấy các phần tử DOM
const categoryList = document.getElementById("category-list");
const addCategoryButton = document.getElementById("add-category-button");
const modal = document.getElementById("category-modal");
const modalTitle = document.getElementById("modal-title");
const categoryForm = document.getElementById("category-form");
const categoryIdInput = document.getElementById("category-id");
const categoryNameInput = document.getElementById("category-name");
const closeModalButton = document.getElementById("close-modal-button");

// Hiển thị danh sách danh mục
function renderCategories() {
    categoryList.innerHTML = "";
    categories.forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>
                <button class="edit-button" data-id="${category.id}">Sửa</button>
                <button class="delete-button" data-id="${category.id}">Xóa</button>
            </td>
        `;
        categoryList.appendChild(row);
    });
    attachEventListeners();
}

// Gán sự kiện cho các nút sửa và xóa
function attachEventListeners() {
    document.querySelectorAll(".edit-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const category = categories.find((cat) => cat.id === id);
            if (category) {
                modalTitle.textContent = "Sửa Danh Mục";
                categoryIdInput.value = category.id;
                categoryNameInput.value = category.name;
                modal.style.display = "block";
            }
        });
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const confirmed = confirm("Bạn có chắc chắn muốn xóa danh mục này?");
            if (confirmed) {
                categories = categories.filter((cat) => cat.id !== id);
                renderCategories();
            }
        });
    });
}

// Hiển thị modal thêm mới
addCategoryButton.addEventListener("click", () => {
    modalTitle.textContent = "Thêm Danh Mục";
    categoryIdInput.value = "";
    categoryNameInput.value = "";
    modal.style.display = "block";
});

// Xử lý lưu danh mục (thêm mới hoặc sửa)
categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = Number(categoryIdInput.value);
    const name = categoryNameInput.value.trim();

    if (id) {
        // Sửa danh mục
        const category = categories.find((cat) => cat.id === id);
        if (category) {
            category.name = name;
        }
    } else {
        // Thêm mới danh mục
        const newCategory = { id: categories.length + 1, name };
        categories.push(newCategory);
    }

    modal.style.display = "none";
    renderCategories();
});

// Đóng modal
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Hiển thị danh sách khi tải trang
renderCategories();
