import React, { useState } from "react";
import FateCalculator from "./FateCalculator";
import ResultSection from "./ResultSection";

function getKoiAdvice(element) {
    const dataFish = [
        {
            element: "Kim",
            koiSpecies: "Cá Koi Showa",
            koiQuantity: "Chẵn",
            pondShape: "Vuông",
            pondLocation: "Phía Tây",
            pondDirection: "Tây Nam",
            koiImage: "link_to_showa_image.jpg",
            koiInfo: "Cá Koi Showa có màu sắc rực rỡ, mang lại may mắn cho gia chủ."
        },
        {
            element: "Thủy",
            koiSpecies: "Cá Koi Asagi",
            koiQuantity: "Lẻ",
            pondShape: "Tròn",
            pondLocation: "Phía Bắc",
            pondDirection: "Bắc",
            koiImage: "link_to_asagi_image.jpg",
            koiInfo: "Cá Koi Asagi tượng trưng cho sự bình yên."
        },
        {
            element: "Mộc",
            koiSpecies: "Cá Koi Kohaku",
            koiQuantity: "Chẵn",
            pondShape: "Hình bầu dục",
            pondLocation: "Phía Đông",
            pondDirection: "Đông Nam",
            koiImage: "link_to_kohaku_image.jpg",
            koiInfo: "Cá Koi Kohaku mang lại sự thịnh vượng và giàu có."
        },
        {
            element: "Hỏa",
            koiSpecies: "Cá Koi Shiro Utsuri",
            koiQuantity: "Lẻ",
            pondShape: "Tam giác",
            pondLocation: "Phía Nam",
            pondDirection: "Nam",
            koiImage: "link_to_tancho_image.jpg",
            koiInfo: "Cá Koi Tancho là biểu tượng của quyết tâm."
        },
        {
            element: "Thổ",
            koiSpecies: "Cá Koi Sanke",
            koiQuantity: "Chẵn",
            pondShape: "Chữ nhật",
            pondLocation: "Phía Tây Nam",
            pondDirection: "Đông Bắc",
            koiImage: "link_to_sanke_image.jpg",
            koiInfo: "Cá Koi Sanke tượng trưng cho sự ổn định."
        }
    ];

    // Bảng tương sinh tương khắc
    const dataElement = [
        { element: "Kim", support: "Thổ", conflict: "Hỏa" },
        { element: "Mộc", support: "Thủy", conflict: "Kim" },
        { element: "Thủy", support: "Kim", conflict: "Thổ" },
        { element: "Hỏa", support: "Mộc", conflict: "Thủy" },
        { element: "Thổ", support: "Hỏa", conflict: "Mộc" }
    ];

    const advice = dataFish.find(advice => advice.element === element);
    const elementInfo = dataElement.find(e => e.element === element);

    // Tìm kiếm thông tin cá Koi của mệnh tương sinh
    const supportAdvice = dataFish.find(advice => advice.element === elementInfo.support);
    // Tìm kiếm thông tin cá Koi của mệnh tương khắc
    const conflictAdvice = dataFish.find(advice => advice.element === elementInfo.conflict);

    return {
        advice, supportAdvice, conflictAdvice
    };
}

function TuVan() {
    const [element, setElement] = useState("");
    const [result, setResult] = useState(null);

    const handleConsult = () => {
        if (!element) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        const advice = getKoiAdvice(element);
        if (advice) {
            setResult(advice);
        } else {
            alert("Không tìm thấy thông tin tư vấn cho mệnh của bạn.");
            setResult(null); // Reset result if no advice found
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
                                    <strong>{result.supportAdvice.koiSpecies}</strong>
                                </i>{" "}
                                với số lượng{" "}
                                <i>
                                    <strong>{result.supportAdvice.koiQuantity}</strong>
                                </i>
                                . Việc lựa chọn loài và số lượng cá phù hợp không chỉ giúp tăng
                                cường tài lộc, mà còn tạo sự hài hòa giữa yếu tố ngũ hành của
                                bạn và không gian sống.
                            </p>
                            <p>
                                Ao cá nên có hình dạng{" "}
                                <i>
                                    <strong>{result.supportAdvice.pondShape}</strong>
                                </i>
                                , đặt tại{" "}
                                <i>
                                    <strong>{result.supportAdvice.pondLocation}</strong>
                                </i>{" "}
                                và quay về hướng{" "}
                                <i>
                                    <strong>{result.supportAdvice.pondDirection}</strong>
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
                            <p>
                                Loài cá Koi{" "}
                                <i>
                                    <strong>{result.supportAdvice.koiSpecies}</strong>
                                </i>{" "}
                                là một trong những loài cá mang ý nghĩa may mắn, tượng trưng cho
                                sự kiên trì, thịnh vượng và trường thọ. Loài cá này nổi bật bởi
                                màu sắc rực rỡ và vẻ đẹp thanh nhã, mang lại vẻ tươi mới và sinh
                                khí cho không gian.
                            </p>
                            <p>
                                Cá Koi cũng là biểu tượng cho sự hòa hợp giữa yếu tố âm và
                                dương, góp phần duy trì sự cân bằng trong ngũ hành và nâng cao
                                vận khí của bạn.
                            </p>
                            <p>{result.supportAdvice.koiInfo}</p>
                            <img
                                className="result-image"
                                src={result.supportAdvice.koiImage}
                                alt={result.supportAdvice.koiSpecies}
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