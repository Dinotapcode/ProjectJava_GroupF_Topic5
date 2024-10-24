import React, { useState } from "react";
import FateCalculator from "./FateCalculator";
import ResultSection from "./ResultSection";

// Hàm xử lý dữ liệu tư vấn dựa trên ngũ hành
function adviceData(element) {
    const dataFish = [
        // Danh sách các loài cá Koi tương ứng với ngũ hành
        {
            element: "Kim",
            koiSpecies: "Cá Koi Showa",
            koiQuantity: "Chẵn",
            koiImage: "link_to_showa_image.jpg",
            koiInfo: "Cá Koi Showa có màu sắc rực rỡ, mang lại may mắn cho gia chủ.",
        },
        {
            element: "Thủy",
            koiSpecies: "Cá Koi Asagi",
            koiQuantity: "Lẻ",
            koiImage: "link_to_asagi_image.jpg",
            koiInfo: "Cá Koi Asagi tượng trưng cho sự bình yên.",
        },
        {
            element: "Mộc",
            koiSpecies: "Cá Koi Kohaku",
            koiQuantity: "Chẵn",
            koiImage: "link_to_kohaku_image.jpg",
            koiInfo: "Cá Koi Kohaku mang lại sự thịnh vượng và giàu có.",
        },
        {
            element: "Hỏa",
            koiSpecies: "Cá Koi Shiro Utsuri",
            koiQuantity: "Lẻ",
            koiImage: "link_to_tancho_image.jpg",
            koiInfo: "Cá Koi Tancho là biểu tượng của quyết tâm.",
        },
        {
            element: "Thổ",
            koiSpecies: "Cá Koi Sanke",
            koiQuantity: "Chẵn",
            koiImage: "link_to_sanke_image.jpg",
            koiInfo: "Cá Koi Sanke tượng trưng cho sự ổn định.",
        },
    ];

    const dataPond = [
        // Danh sách các hình dạng và vị trí ao tương ứng với ngũ hành
        { element: "Kim", pondShape: "Vuông", pondLocation: "Phía Tây", pondDirection: "Tây Nam" },
        { element: "Thủy", pondShape: "Tròn", pondLocation: "Phía Bắc", pondDirection: "Bắc" },
        { element: "Mộc", pondShape: "Hình bầu dục", pondLocation: "Phía Đông", pondDirection: "Đông Nam" },
        { element: "Hỏa", pondShape: "Tam giác", pondLocation: "Phía Nam", pondDirection: "Nam" },
        { element: "Thổ", pondShape: "Tam giác", pondLocation: "Phía Nam", pondDirection: "Nam" },
    ];

    const dataElement = [
        // Bảng tương sinh và tương khắc của các ngũ hành
        { element: "Kim", support: "Thổ", conflict: "Hỏa" },
        { element: "Mộc", support: "Thủy", conflict: "Kim" },
        { element: "Thủy", support: "Kim", conflict: "Thổ" },
        { element: "Hỏa", support: "Mộc", conflict: "Thủy" },
        { element: "Thổ", support: "Hỏa", conflict: "Mộc" },
    ];

    // Tìm thông tin tương ứng cho ngũ hành đã chọn
    const fishInfo = dataFish.find((fish) => fish.element === element);
    const pondInfo = dataPond.find((pond) => pond.element === element);
    const elementInfo = dataElement.find((e) => e.element === element);

    // Tìm thông tin cá và ao của ngũ hành tương sinh và tương khắc
    const supportFish = dataFish.find((fish) => fish.element === elementInfo?.support);
    const conflictFish = dataFish.find((fish) => fish.element === elementInfo?.conflict);
    const supportPond = dataPond.find((pond) => pond.element === elementInfo?.support);
    const conflictPond = dataPond.find((pond) => pond.element === elementInfo?.conflict);

    return { fishInfo, pondInfo, supportFish, conflictFish, supportPond, conflictPond };
}

function checkCompatibility(
    element,
    species,
    quantity,
    pondShape,
    location,
    direction
) {
    const advice = adviceData(element);
    let score = 0;
    let suggestion = "";
    let suggestionSpecies = "";
    let suggestionQuantity = "";
    let suggestionPondShape = "";
    let suggestionLocation = "";
    let suggestionDirection = "";

    // So sánh với dữ liệu từ adviceData
    if (species === advice.supportFish.koiSpecies) {
        score += 20;
        suggestionSpecies += "Ngũ hành " + element + " rất hợp với giống cá " + species + ", điều này mang lại sự thịnh vượng và cân bằng năng lượng cho không gian sống.";
    } else if (species === advice.conflictFish.koiSpecies) {
        score += 0;
        suggestionSpecies += "Giống cá " + species + " xung khắc với ngũ hành " + element + ". Bạn nên xem xét chọn một giống cá khác để tránh ảnh hưởng tiêu cực đến phong thủy.";
    } else {
        score += 10;
        suggestionSpecies += "Giống cá " + species + " không hoàn toàn tương thích với ngũ hành " + element + ", có thể ảnh hưởng một phần đến sự cân bằng năng lượng, tuy nhiên không gây ra ảnh hưởng lớn.";
    }

    if (quantity === advice.supportFish.koiQuantity) {
        score += 20;
        suggestionQuantity += "Số lượng cá rất phù hợp với ngũ hành, giúp tăng cường vượng khí và mang lại sự hài hòa trong không gian.";
    }
    else {
        score += 10;
        suggestionQuantity += "Số lượng cá không tối ưu cho phong thủy, có thể dẫn đến mất cân bằng nhẹ trong vượng khí.";
    }

    if (pondShape === advice.supportPond.pondShape) {
        score += 20;
        suggestionPondShape += "Hình dạng hồ cá rất hợp với ngũ hành, tạo ra sự lưu thông năng lượng thuận lợi và ổn định.";
    } else if (pondShape === advice.conflictPond.pondShape) {
        score += 0;
        suggestionPondShape += "Hình dạng hồ cá xung khắc với ngũ hành " + element + ", hãy cân nhắc thay đổi để tạo sự hài hòa hơn.";
    } else {
        score += 10;
        suggestionPondShape += "Hình dạng hồ cá chưa tối ưu, có thể làm giảm sự lưu thông năng lượng tích cực trong khu vực.";
    }

    if (location === advice.supportPond.pondLocation) {
        score += 20;
        suggestionLocation += "Vị trí hồ cá rất tốt cho ngũ hành, đảm bảo nguồn năng lượng tốt sẽ được dẫn vào không gian sống của bạn.";
    } else if (location === advice.conflictPond.pondLocation) {
        score += 0;
        suggestionLocation += "Vị trí hồ cá không nên ở " + location + " vì điều này có thể gây ảnh hưởng tiêu cực đến dòng chảy năng lượng.";
    } else {
        score += 10;
        suggestionLocation += "Vị trí hồ cá chưa hợp lí, nhưng vẫn có thể duy trì được sự ổn định trong dòng chảy năng lượng.";
    }

    if (direction === advice.supportPond.pondDirection) {
        score += 20;
        suggestionDirection += "Hướng của hồ cá rất tốt cho ngũ hành, giúp đón nhận năng lượng tích cực từ các phương hướng thuận lợi.";
    } else if (direction === advice.conflictFish) {
        score += 0;
        suggestionDirection += "Hướng của hồ cá không nên là " + direction + " vì điều này có thể dẫn đến xung khắc lớn về năng lượng.";
    } else {
        score += 10;
        suggestionDirection += "Hướng của hồ cá chưa phù hợp, nhưng không gây ra sự xung khắc lớn về năng lượng, có thể cân nhắc điều chỉnh để tối ưu hơn.";
    }

    suggestion +=
        score > 70
            ? "Tổng thể rất tốt cho phong thủy hồ cá cá, bạn có thể hoàn toàn yên tâm về sự hài hòa và may mắn."
            : "Một vài yếu tố cần được xem xét và điều chỉnh để cải thiện phong thủy tổng thể, giúp tạo ra không gian sống cân bằng và thịnh vượng hơn.";

    return {
        score,
        suggestionSpecies,
        suggestionQuantity,
        suggestionPondShape,
        suggestionLocation,
        suggestionDirection,
        suggestion,
    };
}


const TraCuu = () => {
    const [element, setElement] = useState("");
    const [koiSpecies, setKoiSpecies] = useState("");
    const [koiQuantity, setKoiQuantity] = useState("");
    const [pondShape, setPondShape] = useState("");
    const [location, setLocation] = useState("");
    const [direction, setDirection] = useState("");
    const [result, setResult] = useState(null);
    const [percent, setPercent] = useState(-10);

    const koiSpeciesOptions = [
        "Cá Koi Showa",
        "Cá Koi Asagi",
        "Cá Koi Kohaku",
        "Cá Koi Shiro Utsuri",
        "Cá Koi Sanke",
    ];
    const koiQuantityOptions = ["Chẵn", "Lẻ"];
    const pondShapeOptions = [
        "Vuông",
        "Tròn",
        "Hình bầu dục",
        "Tam giác",
        "Chữ nhật",
        "Vô định ",
    ];
    const locationOptions = [
        "Phía Bắc",
        "Phía Nam",
        "Phía Đông",
        "Phía Tây",
        "Phía Tây Bắc",
        "Phía Đông Nam",
        "Phía Đông Bắc",
        "Phía Tây Nam",
    ];
    const directionOptions = [
        "Bắc",
        "Nam",
        "Đông",
        "Tây",
        "Đông Bắc",
        "Đông Nam",
        "Tây Bắc",
        "Tây Nam",
    ];

    const handleConsult = () => {
        if (
            !element ||
            !koiSpecies ||
            !koiQuantity ||
            !pondShape ||
            !location ||
            !direction
        ) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const compatibility = checkCompatibility(
            element,
            koiSpecies,
            koiQuantity,
            pondShape,
            location,
            direction
        );
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
                        <select
                            id="species"
                            value={koiSpecies}
                            onChange={(e) => setKoiSpecies(e.target.value)}
                        >
                            <option value="">Loài cá Koi</option>
                            {koiSpeciesOptions.map((species) => (
                                <option key={species} value={species}>
                                    {species}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="quantity">Số lượng:</label>
                        <select
                            id="quantity"
                            value={koiQuantity}
                            onChange={(e) => setKoiQuantity(e.target.value)}
                        >
                            <option value="">Số lượng</option>
                            {koiQuantityOptions.map((quantity) => (
                                <option key={quantity} value={quantity}>
                                    {quantity}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="pondShape">Hình dạng hồ cá:</label>
                        <select
                            id="pondShape"
                            value={pondShape}
                            onChange={(e) => setPondShape(e.target.value)}
                        >
                            <option value="">Hình dạng hồ cá</option>
                            {pondShapeOptions.map((shape) => (
                                <option key={shape} value={shape}>
                                    {shape}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="location">Vị trí hồ cá:</label>
                        <select
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Vị trí hồ cá</option>
                            {locationOptions.map((loc) => (
                                <option key={loc} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input__group">
                        <label htmlFor="direction">Hướng của hồ cá:</label>
                        <select
                            id="direction"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                        >
                            <option value="">Hướng của hồ cá</option>
                            {directionOptions.map((dir) => (
                                <option key={dir} value={dir}>
                                    {dir}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="input__btnResult" onClick={handleConsult}>
                        Tra cứu
                    </button>
                </section>

                <section className="layout__result">
                    {result ? (
                        <div id="traCuuResult" className="result">
                            <h3>Mức độ phù hợp với cá Koi của bạn</h3>
                            <div className="result__percent">
                                <div className="percent">
                                    <div className="percent-value">{percent}%</div>
                                    <div
                                        className="percent-loading"
                                        style={{ top: `calc(100% - ${percent}% - 10%)` }}
                                    ></div>
                                </div>
                            </div>
                            <h3>Gợi ý phù hợp cho bạn:</h3>
                            <ul>
                                <li>
                                    <p>{result.suggestionSpecies}</p>
                                </li>
                                <li>
                                    <p>{result.suggestionQuantity}</p>
                                </li>
                                <li>
                                    <p>{result.suggestionPondShape}</p>
                                </li>
                                <li>
                                    <p>{result.suggestionLocation}</p>
                                </li>
                                <li>
                                    <p>{result.suggestionDirection}</p>
                                </li>
                                <li>
                                    <p>{result.suggestion}</p>
                                </li>
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