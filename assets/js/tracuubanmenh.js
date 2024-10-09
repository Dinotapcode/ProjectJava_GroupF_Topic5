// Khởi tạo kết quả mặc định
document.addEventListener('DOMContentLoaded', function() {
    var resultSections = document.querySelectorAll('.result');
    var articleContent = `
            <h3>Cá Koi: Biểu Tượng Của May Mắn</h3>
            <p>Cá Koi, một loài cá cảnh nổi tiếng có nguồn gốc từ Nhật Bản, được coi là biểu tượng của sự may mắn và thịnh vượng. Chúng không chỉ thu hút ánh nhìn với màu sắc rực rỡ mà còn mang trong mình những ý nghĩa phong thủy sâu sắc.</p>
            <img class="koi-image" src="../assets/img/anh_mo_ta_ca_koi.webp" alt="ảnh cá koi">
            <p>Điều đặc biệt về cá Koi là khả năng sống lâu, tuổi thọ có thể lên đến 25-35 năm nếu được chăm sóc đúng cách. Với sự chăm sóc chu đáo, cá Koi sẽ mang lại may mắn và tài lộc cho gia chủ.</p>
        </section>

        <section>
            <h3>Hồ Cá: Nơi Giao Thoa Năng Lượng</h3>
            <p>Hồ cá Koi không chỉ là nơi sống của cá mà còn là yếu tố quan trọng trong việc cải thiện phong thủy. Một hồ cá đẹp và hài hòa có thể thu hút tài lộc, thịnh vượng và hạnh phúc cho gia đình. Một số yếu tố cần lưu ý khi thiết kế hồ cá bao gồm:</p>
            <ul>
                <li><strong>Hình dạng:</strong> Nên chọn hồ có hình dạng mềm mại, tránh các góc nhọn, tạo sự hài hòa trong không gian sống.</li>
                <li><strong>Vị trí:</strong> Hồ cá nên được đặt ở những nơi có ánh sáng tự nhiên nhưng không quá gắt, giúp tạo ra môi trường sống tốt nhất cho cá.</li>
                <li><strong>Hệ thống lọc nước:</strong> Điều này rất quan trọng để đảm bảo nước trong hồ luôn sạch sẽ và trong lành.</li>
                <li><strong>Cây cảnh và trang trí:</strong> Thêm cây cảnh và các vật trang trí sẽ tạo nên một không gian sinh động, nhưng cần tránh làm che khuất ánh sáng cần thiết cho cá.</li>
            </ul>
            <p>Khi lựa chọn số lượng cá Koi và thiết kế hồ cá, cần cân nhắc đến bản mệnh của gia chủ để đạt được sự hài hòa và thu hút năng lượng tích cực.</p>
        </section>`;

    resultSections.forEach(function(section) {
        if (!section.innerHTML.trim()) {
            section.innerHTML = articleContent;
        }
    });
});


// Lấy ngày hiện tại
const today = new Date();
const currentYear = today.getFullYear();
const minYear = currentYear - 100;

// Tạo tùy chọn cho ngày
const daySelects = document.querySelectorAll('.birthDay');
daySelects.forEach(daySelect => {
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
});

// Tạo tùy chọn cho tháng
const monthSelects = document.querySelectorAll('.birthMonth');
monthSelects.forEach(monthSelect => {
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tháng ${i}`;
        monthSelect.appendChild(option);
    }
});

// Tạo tùy chọn cho năm
const yearSelects = document.querySelectorAll('.birthYear');
yearSelects.forEach(yearSelect => {
    for (let i = currentYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
});


// Tạo ngày sinh từ các lựa chọn
function getBirthDate() {
    const day = document.querySelector('.birthDay').value;
    const month = document.querySelector('.birthMonth').value;
    const year = document.querySelector('.birthYear').value;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// Tính toán mệnh dựa trên giới tính và ngày sinh
function calculateElement(gender, birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const elementCycle = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];
    const elementIndex = (birthYear % 10) % 5;

    return elementCycle[elementIndex];
}

// Hàm cung cấp tư vấn loài cá Koi, số lượng cá (chẵn/lẻ), và đặc điểm ao phù hợp dựa trên mệnh
function getAdvice(element) {
    const adviceData = {
        'Kim': {
            koiSpecies: 'Cá Koi Showa',
            koiQuantity: 'Chẵn',
            pondShape: 'Vuông',
            pondLocation: 'Phía Tây',
            pondDirection: 'Tây Nam',
            koiImage: 'link_to_showa_image.jpg', // Đường dẫn đến hình ảnh
            koiInfo: 'Cá Koi Showa là loài cá có màu sắc rực rỡ, mang lại may mắn cho gia chủ.'
        },
        'Thủy': {
            koiSpecies: 'Cá Koi Asagi',
            koiQuantity: 'Lẻ',
            pondShape: 'Tròn',
            pondLocation: 'Phía Bắc',
            pondDirection: 'Bắc',
            koiImage: 'link_to_asagi_image.jpg', // Đường dẫn đến hình ảnh
            koiInfo: 'Cá Koi Asagi có màu sắc độc đáo và biểu tượng cho sự bình yên.'
        },
        'Mộc': {
            koiSpecies: 'Cá Koi Kohaku',
            koiQuantity: 'Chẵn',
            pondShape: 'Hình bầu dục',
            pondLocation: 'Phía Đông',
            pondDirection: 'Đông Nam',
            koiImage: 'link_to_kohaku_image.jpg', // Đường dẫn đến hình ảnh
            koiInfo: 'Cá Koi Kohaku mang lại sự thịnh vượng và giàu có.'
        },
        'Hỏa': {
            koiSpecies: 'Cá Koi Shiro Utsuri',
            koiQuantity: 'Lẻ',
            pondShape: 'Tam giác',
            pondLocation: 'Phía Nam',
            pondDirection: 'Nam',
            koiImage: 'link_to_tancho_image.jpg', // Đường dẫn đến hình ảnh
            koiInfo: 'Cá Koi Tancho là biểu tượng của sức mạnh và quyết tâm.'
        },
        'Thổ': {
            koiSpecies: 'Cá Koi Sanke',
            koiQuantity: 'Chẵn',
            pondShape: 'Chữ nhật',
            pondLocation: 'Phía Tây Nam',
            pondDirection: 'Đông Bắc',
            koiImage: 'link_to_sanke_image.jpg', // Đường dẫn đến hình ảnh
            koiInfo: 'Cá Koi Sanke mang lại sự ổn định và bền vững cho gia đình.'
        }
    };

    return adviceData[element];
}

// Hàm tư vấn cá Koi dựa trên thông tin người dùng nhập và xuất kết quả dưới dạng đoạn văn
function tuVanKoi() {
    const gender = document.getElementById('gender').value;
    const birthDate = getBirthDate();

    if (!birthDate) {
        alert('Vui lòng nhập ngày sinh.');
        return;
    }

    const userElement = calculateElement(gender, birthDate);
    const advice = getAdvice(userElement);

    const resultDiv = document.getElementById('tuVanResult');
    const koiInfoDiv = document.getElementById('koiInfo');

    resultDiv.innerHTML = `<p>Dựa trên thông tin bạn cung cấp, mệnh của bạn là <strong>${userElement}</strong>. 
                         Loài cá Koi phù hợp nhất với bạn là <strong>${advice.koiSpecies}</strong>, 
                         với số lượng <strong>${advice.koiQuantity}</strong>.</p>
                         <p>Ao cá nên có hình dạng <strong>${advice.pondShape}</strong>, 
                         được đặt ở vị trí <strong>${advice.pondLocation}</strong> quay về hướng <strong>${advice.pondDirection}</strong> 
                         sẽ mang lại sự thịnh vượng cho bạn.</p>`;

    // Hiển thị thông tin cá Koi
    koiInfoDiv.innerHTML = `<h3>Thông tin về loài cá:</h3>
                          <p>${advice.koiInfo}</p>
                          <img src="${advice.koiImage}" alt="${advice.koiSpecies}">`;
}

// Giả sử bạn đã lấy dữ liệu từ SQL và lưu vào các mảng
const koiSpeciesOptions = ['Cá Koi Showa', 'Cá Koi Asagi', 'Cá Koi Kohaku', 'Cá Koi Shiro Utsuri', 'Cá Koi Sanke'];
const pondShapeOptions = ['Vuông', 'Tròn', 'Hình bầu dục', 'Tam giác', 'Chữ nhật', 'Vô định'];
const locationOptions = ['Phía Bắc', 'Phía Nam', 'Phía Đông', 'Phía Tây', 'Phía Tây Bắc', 'Phía Đông Nam', 'Phía Đông Bắc', 'Phía Tây Nam'];
const directionOptions = ['Bắc', 'Nam', 'Đông', 'Tây', 'Đông Bắc', 'Đông Nam', 'Tây Bắc', 'Tây Nam'];

// Hàm để thêm tùy chọn vào các dropdown
function populateSelectOptions() {
    const speciesSelect = document.getElementById('species');
    koiSpeciesOptions.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species;
        speciesSelect.appendChild(option);
    });

    const pondShapeSelect = document.getElementById('pondShape');
    pondShapeOptions.forEach(shape => {
        const option = document.createElement('option');
        option.value = shape;
        option.textContent = shape;
        pondShapeSelect.appendChild(option);
    });

    const locationSelect = document.getElementById('location');
    locationOptions.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationSelect.appendChild(option);
    });

    const directionSelect = document.getElementById('direction');
    directionOptions.forEach(direction => {
        const option = document.createElement('option');
        option.value = direction;
        option.textContent = direction;
        directionSelect.appendChild(option);
    });
}

// Gọi hàm để thêm tùy chọn vào dropdown khi trang được tải
window.onload = populateSelectOptions;

// Hàm kiểm tra độ phù hợp của ao và cá Koi hiện tại với mệnh
function checkCompatibility(element, species, quantity, pondShape, location, direction) {
    const advice = getAdvice(element);
    let score = 0;

    // Logic kiểm tra độ phù hợp
    if (species.toLowerCase() === advice.koiSpecies.toLowerCase()) score++;
    if (quantity % 2 === 0 && advice.koiQuantity === 'Chẵn') score++;
    if (pondShape.toLowerCase() === advice.pondShape.toLowerCase()) score++;
    if (location.toLowerCase() === advice.pondLocation.toLowerCase()) score++;
    if (direction.toLowerCase() === advice.pondDirection.toLowerCase()) score++;

    return { score, suggestion: score >= 3 ? "Cá Koi của bạn phù hợp!" : "Cá Koi của bạn cần được điều chỉnh." };
}

// Hàm tra cứu
function traCuu() {
    const species = document.getElementById('species').value;
    const quantity = document.getElementById('quantity').value;
    const pondShape = document.getElementById('pondShape').value;
    const location = document.getElementById('location').value;
    const direction = document.getElementById('direction').value;

    if (!species || !quantity || !pondShape || !location || !direction) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
    }

    const gender = document.getElementById('gender').value;
    const birthDate = getBirthDate();

    const userElement = calculateElement(gender, birthDate);

    const compatibility = checkCompatibility(userElement, species, quantity, pondShape, location, direction);

    const resultDiv = document.getElementById('traCuuResult');
    resultDiv.innerHTML = `<p><strong>Mức độ phù hợp:</strong> ${compatibility.score}</p>
                         <p><strong>Gợi ý:</strong> ${compatibility.suggestion}</p>`;
}

// Chuyển đổi giữa hai phần tư vấn và tra cứu
function showSection(section) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');

    // Cập nhật trạng thái nút
    document.getElementById('tuVanBtn').classList.remove('active');
    document.getElementById('traCuuBtn').classList.remove('active');
    if (section === 'tuVan') {
        document.getElementById('tuVanBtn').classList.add('active');
    } else {
        document.getElementById('traCuuBtn').classList.add('active');
    }
}