import React, { useState } from "react";
import InputGroup from "../../../components/InputGroup";
import ResultDisplay from "../../../components/ResultDisplay";

const TraCuuPage = () => {
    const [resultText, setResultText] = useState("");

    const handleTraCuu = () => {
        // Logic tra cứu
        const result = "Kết quả tra cứu độ phù hợp";
        setResultText(result);
    };

    return (
        <article className="layout">
            <section className="layout__input">
                <h2>Tra Cứu Độ Phù Hợp</h2>
                <InputGroup label="Ngày sinh:">{/* Thêm phần tử đầu vào ở đây */}</InputGroup>
                <button className="btnResult" onClick={handleTraCuu}>
                    Tra Cứu
                </button>
            </section>
            <section className="layout__result">
                <ResultDisplay resultText={resultText} />
            </section>
        </article>
    );
};

export default TraCuuPage;
