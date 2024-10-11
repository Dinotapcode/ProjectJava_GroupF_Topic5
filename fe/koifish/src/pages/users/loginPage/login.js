// Xử lý sự kiện khi form đăng nhập được submit
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn không cho form tự động gửi

    // Lấy thông tin từ các input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra xem các trường có được điền đầy đủ không
    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    // Xử lý đăng nhập (có thể tích hợp backend hoặc API)
    console.log("Username:", username);
    console.log("Password:", password);

    // Thông báo đăng nhập thành công
    alert("Login successful!");
});
