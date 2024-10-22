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
    let suggestionSpecies = '';
    let suggestionQuantity = '';
    let suggestionPondShape = '';
    let suggestionLocation = '';
    let suggestionDirection = '';

    // So sánh với dữ liệu từ getAdvice
    if (species === advice.koiSpecies) {
        score += 20;
        suggestionSpecies += `Ngũ hành ${element} rất hợp với giống cá ${species}, điều này mang lại sự thịnh vượng và cân bằng năng lượng cho không gian sống.`;
    } else {
        score += 5;
        suggestionSpecies += `Giống cá ${species} không hoàn toàn tương thích với ngũ hành ${element}, có thể ảnh hưởng một phần đến sự cân bằng năng lượng, tuy nhiên không gây ra ảnh hưởng lớn.`;
    }

    if (quantity === advice.koiQuantity) {
        score += 20;
        suggestionQuantity += 'Số lượng cá rất phù hợp với ngũ hành, giúp tăng cường vượng khí và mang lại sự hài hòa trong không gian.';
    } else {
        score += 5;
        suggestionQuantity += 'Số lượng cá không tối ưu cho phong thủy, có thể dẫn đến mất cân bằng nhẹ trong vượng khí.';
    }

    if (pondShape === advice.pondShape) {
        score += 20;
        suggestionPondShape += 'Hình dạng ao rất hợp với ngũ hành, tạo ra sự lưu thông năng lượng thuận lợi và ổn định.';
    } else {
        score += 5;
        suggestionPondShape += 'Hình dạng ao chưa tối ưu, có thể làm giảm sự lưu thông năng lượng tích cực trong khu vực.';
    }

    if (location === advice.pondLocation) {
        score += 20;
        suggestionLocation += 'Vị trí ao rất tốt cho ngũ hành, đảm bảo nguồn năng lượng tốt sẽ được dẫn vào không gian sống của bạn.';
    } else {
        score += 5;
        suggestionLocation += 'Vị trí ao không tối ưu, nhưng vẫn có thể duy trì được sự ổn định trong dòng chảy năng lượng.';
    }

    if (direction === advice.pondDirection) {
        score += 20;
        suggestionDirection += 'Hướng ao rất tốt cho ngũ hành, giúp đón nhận năng lượng tích cực từ các phương hướng thuận lợi.';
    } else {
        score += 5;
        suggestionDirection += 'Hướng ao chưa hoàn hảo, nhưng không gây ra sự xung khắc lớn về năng lượng, có thể cân nhắc điều chỉnh để tối ưu hơn.';
    }

    suggestion += score > 70 ? 'Tổng thể rất tốt cho phong thủy ao cá, bạn có thể hoàn toàn yên tâm về sự hài hòa và may mắn.' :
        'Một vài yếu tố cần được xem xét và điều chỉnh để cải thiện phong thủy tổng thể, giúp tạo ra không gian sống cân bằng và thịnh vượng hơn.';

    return { score, suggestionSpecies, suggestionQuantity, suggestionPondShape, suggestionLocation, suggestionDirection, suggestion };
}

const TraCuu = () => {
    const [element, setElement] = useState('');
    const [koiSpecies, setKoiSpecies] = useState('');
    const [koiQuantity, setKoiQuantity] = useState('');
    const [pondShape, setPondShape] = useState('');
    const [location, setLocation] = useState('');
    const [direction, setDirection] = useState('');
    const [result, setResult] = useState(null);
    const [percent, setPercent] = useState(-10);

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

        setPercent(compatibility.score);
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
                            <h3>Mức độ phù hợp với cá Koi của bạn</h3>
                            <div className="result__percent">
                                <div className="percent">
                                    <div class="percent-value">{percent}%</div>
                                    <div
                                        className="percent-loading"
                                        style={{ top: `calc(100% - ${percent}% - 10%)` }}
                                    ></div>
                                </div>
                            </div>
                            <h3>Gợi ý phù hợp cho bạn:</h3>
                            <ul>
                                <li> <p>{result.suggestionSpecies}</p></li>
                                <li> <p>{result.suggestionQuantity}</p></li>
                                <li> <p>{result.suggestionPondShape}</p></li>
                                <li> <p>{result.suggestionLocation}</p></li>
                                <li> <p>{result.suggestionDirection}</p></li>
                                <li> <p>{result.suggestion}</p></li>
                            </ul>
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
