import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../utils/router";
import DateAndSex from "./DateAndSex";
import ResultSection from "./ResultSection";

const TuVan = () => {
    const [dateAndSex, setDateAndSex] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleResult = useCallback((result) => {
        setDateAndSex(result);
    }, []); 

    const handleLookup = async () => {
        if (!dateAndSex?.birthDate || !dateAndSex?.gender) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8083/api/public/fate?birthDate=${dateAndSex.birthDate}&gender=${dateAndSex.gender}`
            );
            if (!response.ok) {
                throw new Error("Không thể truy cập API");
            }
            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch (err) {
            setError("Có lỗi xảy ra khi truy cập API.");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveToSession = () => {
        if (result) {
            const koiNames = result.supportingKoi.map(koi => koi.species).join(", ");
            const pondShapes = result.supportingPond.map(pond => pond.shape).join(", ");
            
            sessionStorage.setItem("koiNames", koiNames);
            sessionStorage.setItem("pondShapes", pondShapes);
        }
    };

    return (
        <section id="tuVan">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input__title">Tư vấn cá Koi phong thủy</h2>
                    <DateAndSex onResult={handleResult} />
                    <button
                        className="input__btnResult"
                        onClick={handleLookup}
                        disabled={loading} 
                    >
                        {loading ? "Đang tra cứu..." : "Tra cứu"}
                    </button>

                    {error && <p className="error">{error}</p>}
                </section>

                <section className="layout__result">
                    {result ? (
                        <div className="result">
                            <h3>Kết Quả Tư Vấn Cá Koi Phong Thủy</h3>

                            <p>
                                Mệnh của bạn là{" "}
                                <i>
                                    <strong>{result.element}</strong>.
                                </i>
                            </p>

                            <div className="result__koi">
                                <p>
                                    Loài cá Koi lý tưởng là{" "}
                                    {result.supportingKoi.map((koi, index) => (
                                        <span key={index}>
                                            <i><strong>{koi.species}</strong></i> với số lượng{" "}
                                            <i><strong>{koi.quantity}</strong></i>
                                            {index !== result.supportingKoi.length - 1 ? "; hoặc " : ". "}
                                        </span>
                                    ))}
                                    Việc lựa chọn loài và số lượng cá phù hợp không chỉ giúp tăng cường tài lộc, mà còn tạo sự hài hòa giữa yếu tố ngũ hành của bạn và không gian sống.
                                </p>
                            </div>

                            <div className="result__pond">
                                <p>
                                    Ao cá nên có{" "}
                                    {result.supportingPond.map((pond, index) => (
                                        <span key={index}>
                                            hình dạng <i><strong>{pond.shape}</strong></i>, đặt tại Phía{" "}
                                            <i><strong>{pond.location}</strong></i> và quay về hướng{" "}
                                            <i><strong>{pond.direction}</strong></i>
                                            {index !== result.supportingPond.length - 1 ? "; hoặc " : "."}
                                        </span>
                                    ))}
                                    Bố trí ao cá hợp phong thủy còn giúp cân bằng yếu tố ngũ hành trong không gian sống của bạn, tạo sự hòa hợp giữa thiên nhiên và con người.
                                </p>
                            </div>

                            <h3>Thông Tin Về Loài Cá Koi: {result.supportingKoi.map(koi => koi.species).join(", ")}</h3>

                            <div className="result__images">
                                {result.supportingKoi.map((koi, index) => (
                                    <img
                                        className="result-image"
                                        key={index}
                                        src={`uploads/img_tracuu/${koi.image}`}
                                        alt={`Hình ảnh cá Koi: ${koi.species}`}
                                    />
                                ))}
                            </div>

                            <p>
                                {result.supportingKoi.map(koi => koi.description).join(". ")}
                            </p>
                            <Link
                                to={ROUTERS.USER.SANPHAM}
                                className="next-to-product"
                                onClick = {handleSaveToSession}
                            >
                                Xem các sản phẩm phù hợp với bạn
                            </Link>
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
