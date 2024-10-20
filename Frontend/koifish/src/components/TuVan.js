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

function TuVan() {
    const [element, setElement] = useState('');
    const [result, setResult] = useState(null);

    const handleConsult = () => {
        if (!element) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        const advice = getAdvice(element);
        setResult(advice);
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
                                Mệnh của bạn là <strong>{element}</strong>. Loài cá Koi lý tưởng là{" "}
                                <strong>{result.koiSpecies}</strong> với số lượng{" "}
                                <strong>{result.koiQuantity}</strong>.
                            </p>
                            <p>
                                Ao cá nên có hình dạng <strong>{result.pondShape}</strong>, đặt tại{" "}
                                <strong>{result.pondLocation}</strong> và quay về hướng{" "}
                                <strong>{result.pondDirection}</strong>.
                            </p>
                            <h3>Thông Tin Về Loài Cá Koi</h3>
                            <p>{result.koiInfo}</p>
                            <img
                                className="result-image"
                                src={result.koiImage}
                                alt={result.koiSpecies}
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