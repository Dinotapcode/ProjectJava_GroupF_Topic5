import React, { useState } from "react";
import InputGroup from "../../../components/InputGroup";
import KoiInfo from "../../../components/KoiInfo";
import ResultDisplay from "../../../components/ResultDisplay";

const TuVanPage = () => {
    const [resultText, setResultText] = useState("");
    const [koiInfo, setKoiInfo] = useState(null);

    const handleTuVan = () => {
        // Logic tính toán tư vấn dựa trên input
        const result = "Một số kết quả dựa trên thông tin nhập vào";
        const koi = { species: "Ví dụ cá Koi", info: "Thông tin về Koi", image: "/path/to/image" };
        setResultText(result);
        setKoiInfo(koi);
    };

    return (
        <article className="layout">
            <section className="layout__input">
                <h2>Tư vấn cá Koi phong thủy</h2>
                <InputGroup label="Ngày sinh:">{/* Thêm phần tử đầu vào ở đây */}</InputGroup>
                <InputGroup label="Giới tính:">{/* Thêm phần tử đầu vào giới tính ở đây */}</InputGroup>
                <button className="btnResult" onClick={handleTuVan}>
                    Tư Vấn
                </button>
            </section>
            <section className="layout__result">
                <ResultDisplay resultText={resultText} />
                {koiInfo && <KoiInfo koiInfo={koiInfo} />}
            </section>
        </article>
    );
};

export default TuVanPage;
