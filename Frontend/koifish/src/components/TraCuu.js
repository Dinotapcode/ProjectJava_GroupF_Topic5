import React, { useState } from 'react';
import BirthDateSelector from './BirthDateSelector';
import ResultSection from './ResultSection';

function calculateElement(gender, birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const elementCycle = ["Kim", "Thủy", "Mộc", "Hỏa", "Thổ"];
    const elementIndex = (birthYear % 10) % 5;
    return elementCycle[elementIndex];
}

function checkCompatibility(element, species, quantity, pondShape, location, direction) {
    let score = 0;
    let suggestion = '';

    // Kiểm tra sự phù hợp ngũ hành và loài cá Koi
    if (element === "Kim" && species === "Cá Koi Showa") {
        score += 10;
        suggestion += 'Ngũ hành Kim rất hợp với Cá Koi Showa.\n';
    } else if (element === "Thủy" && species === "Cá Koi Asagi") {
        score += 10;
        suggestion += 'Ngũ hành Thủy rất hợp với Cá Koi Asagi.\n';
    } else {
        score += 5;
        suggestion += 'Loài cá Koi này có thể hợp nhưng không hoàn toàn lý tưởng.\n';
    }

    // Kiểm tra số lượng chẵn/lẻ
    if (quantity === "even") {
        score += 10;
        suggestion += 'Số lượng cá chẵn tạo sự ổn định.\n';
    } else if (quantity === "odd") {
        score += 5;
        suggestion += 'Số lượng cá lẻ mang lại năng động nhưng có thể không ổn định.\n';
    }

    // Kiểm tra hình dạng ao
    if (element === "Thổ" && pondShape === "Vuông") {
        score += 10;
        suggestion += 'Hình dạng ao vuông rất phù hợp với ngũ hành Thổ.\n';
    } else if (element === "Mộc" && pondShape === "Tròn") {
        score += 10;
        suggestion += 'Ao tròn giúp cân bằng năng lượng của Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Hình dạng ao không gây xung khắc lớn, nhưng chưa tối ưu.\n';
    }

    // Kiểm tra vị trí ao
    if (location === "Phía Bắc" && element === "Thủy") {
        score += 10;
        suggestion += 'Vị trí ao phía Bắc tăng cường năng lượng cho Thủy.\n';
    } else if (location === "Phía Đông Nam" && element === "Mộc") {
        score += 10;
        suggestion += 'Phía Đông Nam hợp với năng lượng của Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Vị trí ao không ảnh hưởng nhiều, nhưng có thể xem xét vị trí tốt hơn.\n';
    }

    // Kiểm tra hướng ao
    if (direction === "Bắc" && element === "Thủy") {
        score += 10;
        suggestion += 'Hướng Bắc rất tốt cho người thuộc Thủy.\n';
    } else if (direction === "Đông" && element === "Mộc") {
        score += 10;
        suggestion += 'Hướng Đông mang lại sinh khí cho Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Hướng ao không lý tưởng nhưng không ảnh hưởng lớn.\n';
    }

    if (score > 40) {
        suggestion += 'Tổng thể, bạn có sự lựa chọn rất tốt cho phong thủy ao cá.\n';
    } else {
        suggestion += 'Bạn nên xem xét điều chỉnh một vài yếu tố để đạt sự cân bằng tốt hơn.\n';
    }

    return { score, suggestion };
}

const TraCuu = () => {
    const [birthDate, setBirthDate] = useState('');
    const [koiSpecies, setKoiSpecies] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [location, setLocation] = useState('');
    const [direction, setDirection] = useState('');
    const [gender, setGender] = useState('');
    const [result, setResult] = useState(null);

    const koiSpeciesOptions = ["Cá Koi Showa", "Cá Koi Asagi", "Cá Koi Kohaku", "Cá Koi Shiro Utsuri", "Cá Koi Sanke"];
    const pondShapeOptions = ["Vuông", "Tròn", "Hình bầu dục", "Tam giác", "Chữ nhật", "Vô định"];
    const locationOptions = ["Phía Bắc", "Phía Nam", "Phía Đông", "Phía Tây", "Phía Tây Bắc", "Phía Đông Nam", "Phía Đông Bắc", "Phía Tây Nam"];
    const directionOptions = ["Bắc", "Nam", "Đông", "Tây", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"];

    const handleBirthDateChange = (newBirthDate) => {
        setBirthDate(newBirthDate);
    };
    const handleConsult = () => {
        if (!koiSpecies || !quantity || !pondShape || !location || !direction || !gender || !birthDate) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const userElement = calculateElement(gender, birthDate);
        const compatibility = checkCompatibility(userElement, koiSpecies, quantity, pondShape, location, direction);

        setResult({
            score: compatibility.score,
            suggestion: compatibility.suggestion,
        });
    };

    return (
        <section id="traCuu">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input-title">Tra Cứu Độ Phù Hợp</h2>
                    <BirthDateSelector onBirthDateChange={handleBirthDateChange} />
                    <div className="input-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="species">Loài cá Koi:</label>
                        <select id="species" value={koiSpecies} onChange={(e) => setKoiSpecies(e.target.value)}>
                            <option value="">Chọn loài cá Koi</option>
                            {koiSpeciesOptions.map((species) => (
                                <option key={species} value={species}>{species}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="quantity">Số lượng:</label>
                        <select id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            <option value="">Chọn số lượng</option>
                            <option value="even">Chẵn</option>
                            <option value="odd">Lẻ</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="pondShape">Hình dạng ao:</label>
                        <select id="pondShape" value={pondShape} onChange={(e) => setPondShape(e.target.value)}>
                            <option value="">Chọn hình dạng ao</option>
                            {pondShapeOptions.map((shape) => (
                                <option key={shape} value={shape}>{shape}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="location">Vị trí ao:</label>
                        <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">Chọn vị trí ao</option>
                            {locationOptions.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="direction">Hướng ao:</label>
                        <select id="direction" value={direction} onChange={(e) => setDirection(e.target.value)}>
                            <option value="">Chọn hướng ao</option>
                            {directionOptions.map((dir) => (
                                <option key={dir} value={dir}>{dir}</option>
                            ))}
                        </select>
                    </div>

                    <button className="btnResult" onClick={handleConsult}>Tra cứu</button>
                </section>

                <section className="layout__result">
                    {result ? (
                        <div id="traCuuResult" className="result">
                            <p><strong>Mức độ phù hợp:</strong> {result.score}</p>
                            <p><strong>Gợi ý:</strong> {result.suggestion}</p>
                        </div>
                    ) : (
                        <ResultSection />
                    )}
                </section>
            </article>
        </section>
    );
};

export default TraCuu;
