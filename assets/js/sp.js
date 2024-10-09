document.querySelector('.choice-all').addEventListener('click', function() {
    filterProducts('all');
});
document.querySelector('.choice-fish').addEventListener('click', function() {
    filterProducts('fish');
});
document.querySelector('.choice-aquarium').addEventListener('click', function() {
    filterProducts('aquarium');
});

document.querySelector('.sortAsc').addEventListener('click', function() {
    sortProducts(true);
});

document.querySelector('.sortDesc').addEventListener('click', function() {
    sortProducts(false);
});

let currentType = 'all'; // Loại sản phẩm hiện tại

function filterProducts(type) {
    currentType = type; // Cập nhật loại sản phẩm
    const container = document.querySelector('.grid-container');
    const products = Array.from(container.querySelectorAll('.product'));

    products.forEach(product => {
        // Kiểm tra nếu là 'all' thì hiển thị tất cả, còn nếu không thì hiển thị theo loại
        if (type === 'all' || product.getAttribute('type') === type) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function sortProducts(asc) {
    const container = document.querySelector('.grid-container');
    const products = Array.from(container.querySelectorAll('.product'));

    // Lọc sản phẩm hiển thị theo loại trước khi sắp xếp
    const visibleProducts = products.filter(product => product.style.display !== 'none');

    visibleProducts.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.product__price').textContent.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.querySelector('.product__price').textContent.replace(/[^\d]/g, ''));
        return asc ? priceA - priceB : priceB - priceA;
    });

    // Xóa các sản phẩm cũ và chèn lại theo thứ tự đã sắp xếp
    visibleProducts.forEach(product => container.appendChild(product));
}