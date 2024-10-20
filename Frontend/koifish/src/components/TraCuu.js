import React, { useState } from 'react';
import FateCalculator from './FateCalculator';
import ResultSection from './ResultSection';

function checkCompatibility(element, species, quantity, pondShape, location, direction) {
    let score = 0;
    let suggestion = '';

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

    if (quantity === "even") {
        score += 10;
        suggestion += 'Số lượng cá chẵn tạo sự ổn định.\n';
    } else if (quantity === "odd") {
        score += 5;
        suggestion += 'Số lượng cá lẻ mang lại năng động nhưng có thể không ổn định.\n';
    }

    if (element === "Thổ" && pondShape === "Vuông") {
        score += 10;
        suggestion += 'Hình dạng ao vuông rất phù hợp với ngũ hành Thổ.\n';
    } else if (element === "Mộc" && pondShape === "Tròn") {
        score += 10;
        suggestion += 'Ao tròn giúp cân bằng năng lượng của Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Hình dạng ao chưa tối ưu.\n';
    }

    if (location === "Phía Bắc" && element === "Thủy") {
        score += 10;
        suggestion += 'Vị trí ao phía Bắc tăng cường năng lượng cho Thủy.\n';
    } else if (location === "Phía Đông Nam" && element === "Mộc") {
        score += 10;
        suggestion += 'Phía Đông Nam hợp với năng lượng của Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Vị trí ao không tối ưu nhưng vẫn ổn.\n';
    }

    if (direction === "Bắc" && element === "Thủy") {
        score += 10;
        suggestion += 'Hướng Bắc rất tốt cho người thuộc Thủy.\n';
    } else if (direction === "Đông" && element === "Mộc") {
        score += 10;
        suggestion += 'Hướng Đông mang lại sinh khí cho Mộc.\n';
    } else {
        score += 5;
        suggestion += 'Hướng ao chưa hoàn hảo nhưng không gây xung khắc.\n';
    }

    suggestion += score > 40 ? 'Tổng thể rất tốt cho phong thủy ao cá.\n' :
        'Nên xem xét điều chỉnh một vài yếu tố.\n';

    return { score, suggestion };
}

const TraCuu = () => {
    const [element, setElement] = useState('');
    const [koiSpecies, setKoiSpecies] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [location, setLocation] = useState('');
    const [direction, setDirection] = useState('');
    const [result, setResult] = useState(null);

    const koiSpeciesOptions = ["Cá Koi Showa", "Cá Koi Asagi", "Cá Koi Kohaku", "Cá Koi Shiro Utsuri", "Cá Koi Sanke"];
    const pondShapeOptions = ["Vuông", "Tròn", "Hình bầu dục", "Tam giác", "Chữ nhật", "Vô định"];
    const locationOptions = ["Phía Bắc", "Phía Nam", "Phía Đông", "Phía Tây", "Phía Tây Bắc", "Phía Đông Nam", "Phía Đông Bắc", "Phía Tây Nam"];
    const directionOptions = ["Bắc", "Nam", "Đông", "Tây", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"];

    const handleConsult = () => {
        if (!element || !koiSpecies || !quantity || !pondShape || !location || !direction) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const compatibility = checkCompatibility(element, koiSpecies, quantity, pondShape, location, direction);
        setResult(compatibility);
    };

    return (
        <section id="traCuu">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input__title">Tra Cứu Độ Phù Hợp</h2>
                    <FateCalculator onResult={setElement} />

                    <div className="input__group">
                        <label htmlFor="species">Loài cá Koi:</label>
                        <select id="species" value={koiSpecies} onChange={(e) => setKoiSpecies(e.target.value)}>
                            <option value="">Loài cá Koi</option>
                            {koiSpeciesOptions.map((species) => (
                                <option key={species} value={species}>{species}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="quantity">Số lượng:</label>
                        <select id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            <option value="">Số lượng</option>
                            <option value="even">Chẵn</option>
                            <option value="odd">Lẻ</option>
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="pondShape">Hình dạng ao:</label>
                        <select id="pondShape" value={pondShape} onChange={(e) => setPondShape(e.target.value)}>
                            <option value="">Hình dạng ao</option>
                            {pondShapeOptions.map((shape) => (
                                <option key={shape} value={shape}>{shape}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="location">Vị trí ao:</label>
                        <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option value="">Vị trí ao</option>
                            {locationOptions.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="direction">Hướng ao:</label>
                        <select id="direction" value={direction} onChange={(e) => setDirection(e.target.value)}>
                            <option value="">Hướng ao</option>
                            {directionOptions.map((dir) => (
                                <option key={dir} value={dir}>{dir}</option>
                            ))}
                        </select>
                    </div>

                    <button className="input__btnResult" onClick={handleConsult}>Tra cứu</button>
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
