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

// Component chính cho tư vấn phong thủy cá Koi
function TuVan() {
    const [element, setElement] = useState(""); // Trạng thái lưu ngũ hành người dùng chọn
    const [result, setResult] = useState(null); // Trạng thái lưu kết quả tư vấn

    // Hàm xử lý khi nhấn nút "Tư Vấn"
    const handleConsult = () => {
        if (!element) {
            alert("Vui lòng nhập đầy đủ thông tin."); // Kiểm tra thông tin đầu vào
            return;
        }
        const fish = adviceData(element); // Lấy dữ liệu tư vấn
        if (fish.fishInfo) {
            setResult(fish); // Cập nhật kết quả nếu tìm thấy thông tin
        } else {
            alert("Không tìm thấy thông tin tư vấn cho mệnh của bạn.");
            setResult(null); // Đặt lại kết quả nếu không có thông tin
        }
    };

    return (
        <section id="tuVan">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input__title">Tư vấn cá Koi phong thủy</h2>
                    <FateCalculator onResult={setElement} />
                    <button className="input__btnResult" onClick={handleConsult}>
                        Tư Vấn
                    </button>
                </section>

                <section className="layout__result">
                    {result ? (
                        <div className="result">
                            <h3>Kết Quả Tư Vấn Cá Koi Phong Thủy</h3>
                            <p>
                                Mệnh của bạn là{" "}
                                <i>
                                    <strong>{element}</strong>
                                </i>
                                . Loài cá Koi lý tưởng là{" "}
                                <i>
                                    <strong>{result.supportFish.koiSpecies}</strong>
                                </i>{" "}
                                với số lượng{" "}
                                <i>
                                    <strong>{result.supportFish.koiQuantity}</strong>
                                </i>
                                . Việc lựa chọn loài và số lượng cá phù hợp không chỉ giúp tăng
                                cường tài lộc, mà còn tạo sự hài hòa giữa yếu tố ngũ hành của
                                bạn và không gian sống.
                            </p>
                            <p>
                                Ao cá nên có hình dạng{" "}
                                <i>
                                    <strong>{result.supportPond.pondShape}</strong>
                                </i>
                                , đặt tại{" "}
                                <i>
                                    <strong>{result.supportPond.pondLocation}</strong>
                                </i>{" "}
                                và quay về hướng{" "}
                                <i>
                                    <strong>{result.supportPond.pondDirection}</strong>
                                </i>
                                . Điều này sẽ giúp kích hoạt năng lượng tích cực và thu hút sự
                                may mắn, tài vận cho gia đình.
                            </p>
                            <p>
                                Bố trí ao cá hợp phong thủy còn giúp cân bằng yếu tố ngũ hành
                                trong không gian sống của bạn, tạo sự hòa hợp giữa thiên nhiên
                                và con người.
                            </p>

                            <h3>Thông Tin Về Loài Cá Koi</h3>
                            <p>{result.supportFish.koiInfo}</p>
                            <img
                                className="result-image"
                                src={result.supportFish.koiImage}
                                alt={result.supportFish.koiSpecies}
                            />
                        </div>
                    ) : (
                        <ResultSection />
                    )}
                </section>
            </article>
        </section>
    );
}

export default TuVan;
