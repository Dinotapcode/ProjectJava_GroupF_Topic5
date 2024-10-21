import React, { useState } from 'react';
import FateCalculator from './FateCalculator';
import ResultSection from './ResultSection';

function getAdvice(element) {
    const adviceData = {
        Kim: {
            koiSpecies: "Cá Koi Showa",
            koiQuantity: "Chẵn",
            pondShape: "Vuông",
            pondLocation: "Phía Tây",
            pondDirection: "Tây Nam",
            koiImage: "link_to_showa_image.jpg",
            koiInfo: "Cá Koi Showa có màu sắc rực rỡ, mang lại may mắn cho gia chủ."
        },
        Thủy: {
            koiSpecies: "Cá Koi Asagi",
            koiQuantity: "Lẻ",
            pondShape: "Tròn",
            pondLocation: "Phía Bắc",
            pondDirection: "Bắc",
            koiImage: "link_to_asagi_image.jpg",
            koiInfo: "Cá Koi Asagi tượng trưng cho sự bình yên."
        },
        Mộc: {
            koiSpecies: "Cá Koi Kohaku",
            koiQuantity: "Chẵn",
            pondShape: "Hình bầu dục",
            pondLocation: "Phía Đông",
            pondDirection: "Đông Nam",
            koiImage: "link_to_kohaku_image.jpg",
            koiInfo: "Cá Koi Kohaku mang lại sự thịnh vượng và giàu có."
        },
        Hỏa: {
            koiSpecies: "Cá Koi Shiro Utsuri",
            koiQuantity: "Lẻ",
            pondShape: "Tam giác",
            pondLocation: "Phía Nam",
            pondDirection: "Nam",
            koiImage: "link_to_tancho_image.jpg",
            koiInfo: "Cá Koi Tancho là biểu tượng của quyết tâm."
        },
        Thổ: {
            koiSpecies: "Cá Koi Sanke",
            koiQuantity: "Chẵn",
            pondShape: "Chữ nhật",
            pondLocation: "Phía Tây Nam",
            pondDirection: "Đông Bắc",
            koiImage: "link_to_sanke_image.jpg",
            koiInfo: "Cá Koi Sanke tượng trưng cho sự ổn định."
        }
    };
    return adviceData[element];
}

function checkCompatibility(element, species, quantity, pondShape, location, direction) {
    const advice = getAdvice(element);
    let score = 0;
    let suggestion = '';

    // So sánh với dữ liệu từ getAdvice
    if (species === advice.koiSpecies) {
        score += 20;
        suggestion += `Ngũ hành ${element} rất hợp với ${species}.\n`;
    } else {
        score += 10;
        suggestion += 'Loài cá Koi này có thể hợp nhưng không hoàn toàn lý tưởng.\n';
    }

    if (quantity === advice.koiQuantity) {
        score += 20;
        suggestion += 'Số lượng cá phù hợp với ngũ hành.\n';
    } else {
        score += 10;
        suggestion += 'Số lượng cá không tối ưu cho phong thủy.\n';
    }

    if (pondShape === advice.pondShape) {
        score += 20;
        suggestion += 'Hình dạng ao rất phù hợp với ngũ hành.\n';
    } else {
        score += 10;
        suggestion += 'Hình dạng ao chưa tối ưu.\n';
    }

    if (location === advice.pondLocation) {
        score += 20;
        suggestion += 'Vị trí ao rất tốt cho ngũ hành.\n';
    } else {
        score += 10;
        suggestion += 'Vị trí ao không tối ưu nhưng vẫn ổn.\n';
    }

    if (direction === advice.pondDirection) {
        score += 20;
        suggestion += 'Hướng ao rất tốt cho ngũ hành.\n';
    } else {
        score += 10;
        suggestion += 'Hướng ao chưa hoàn hảo nhưng không gây xung khắc.\n';
    }

    suggestion += score > 70 ? 'Tổng thể rất tốt cho phong thủy ao cá.\n' :
        'Nên xem xét điều chỉnh một vài yếu tố.\n';

    return { score, suggestion };
}

const TraCuu = () => {
    const [element, setElement] = useState('');
    const [koiSpecies, setKoiSpecies] = useState('');
    const [koiQuantity, setKoiQuantity] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [location, setLocation] = useState('');
    const [direction, setDirection] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const koiSpeciesOptions = ["Cá Koi Showa", "Cá Koi Asagi", "Cá Koi Kohaku", "Cá Koi Shiro Utsuri", "Cá Koi Sanke"];
    const koiQuantityOptions = ["Chẵn", "Lẻ"];
    const pondShapeOptions = ["Vuông", "Tròn", "Hình bầu dục", "Tam giác", "Chữ nhật", "Vô định"];
    const locationOptions = ["Phía Bắc", "Phía Nam", "Phía Đông", "Phía Tây", "Phía Tây Bắc", "Phía Đông Nam", "Phía Đông Bắc", "Phía Tây Nam"];
    const directionOptions = ["Bắc", "Nam", "Đông", "Tây", "Đông Bắc", "Đông Nam", "Tây Bắc", "Tây Nam"];

    const handleConsult = () => {
        if (!element || !koiSpecies || !koiQuantity || !pondShape || !location || !direction) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const compatibility = checkCompatibility(element, koiSpecies, koiQuantity, pondShape, location, direction);
        setResult(compatibility);

        setLoading(true); // Bắt đầu loading
        setTimeout(() => {
            setLoading(false); // Kết thúc loading sau 2 giây
        }, 5000);
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
                        <select id="quantity" value={koiQuantity} onChange={(e) => setKoiQuantity(e.target.value)}>
                            <option value="">Số lượng</option>
                            {koiQuantityOptions.map((quantity) => (
                                <option key={quantity} value={quantity}>{quantity}</option>
                            ))}
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
                            <div className="result__percent">
                                {loading && (
                                    <div className="result__percent-loading"></div>
                                )}
                                {!loading && <p>{result.score}</p>}
                            </div>
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
