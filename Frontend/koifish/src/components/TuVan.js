import React, { useState, useCallback } from "react";
import DateAndSex from "./DateAndSex";
import ResultSection from "./ResultSection";

// Component chính cho tư vấn phong thủy cá Koi
const TuVan = () => {
    const [dateAndSex, setDateAndSex] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Memoize the handleResult function to prevent unnecessary re-renders
    const handleResult = useCallback((result) => {
        setDateAndSex(result);
    }, []); // Empty dependency array ensures it's stable

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
            setResult(data);
        } catch (err) {
            setError("Có lỗi xảy ra khi truy cập API.");
        } finally {
            setLoading(false);
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
                        disabled={loading} // Vô hiệu hóa nút khi đang tải
                    >
                        {loading ? "Đang tra cứu..." : "Tra cứu"}
                    </button>

                    {error && <p className="error">{error}</p>} {/* Hiển thị lỗi nếu có */}
                </section>

                <section className="layout__result">
                    {result ? (
                        <div className="result">
                            <h3>Kết Quả Tư Vấn Cá Koi Phong Thủy</h3>
                            <p>
                                Mệnh của bạn là{" "}
                                <i>
                                    <strong>{result.element}</strong>
                                </i>
                                . Loài cá Koi lý tưởng là{" "}
                                <i>
                                    <strong>{result.supportingKoi.species}</strong>
                                </i>{" "}
                                với số lượng{" "}
                                <i>
                                    <strong>{result.supportingKoi.map(koi => koi.quantity).join(", ")}</strong>
                                </i>
                                . Việc lựa chọn loài và số lượng cá phù hợp không chỉ giúp tăng
                                cường tài lộc, mà còn tạo sự hài hòa giữa yếu tố ngũ hành của
                                bạn và không gian sống.
                            </p>
                            <p>
                                Ao cá nên có hình dạng{" "}
                                <i>
                                    <strong>{result.supportingPond.map(pond => pond.shape).join(", ")}</strong>
                                </i>
                                , đặt tại{" "}
                                <i>
                                    <strong>{result.supportingPond.map(pond => pond.location).join(", ")}</strong>
                                </i>{" "}
                                và quay về hướng{" "}
                                <i>
                                    <strong>{result.supportingPond.map(pond => pond.direction).join(", ")}</strong>
                                </i>
                                . Điều này sẽ giúp kích hoạt năng lượng tích cực và thu hút sự
                                may mắn, tài vận cho gia đình.
                            </p>
                            <p>
                                Bố trí ao cá hợp phong thủy còn giúp cân bằng yếu tố ngũ hành
                                trong không gian sống của bạn, tạo sự hòa hợp giữa thiên nhiên
                                và con người.
                            </p>


                            <h3>Thông Tin Về Loài Cá Koi {result.supportingKoi.map(koi => koi.species).join(", ")}</h3>
                            {result.supportingKoi.map((koi, index) => (
                                <img className="result-image"
                                    key={index}
                                    src={`uploads/img_tracuu/${koi.image}`}
                                    alt={`Hình ảnh cá Koi: ${koi.species}`}
                                />
                            ))}
                            <p>{result.supportingKoi.map(koi => koi.description).join(", ")}</p>

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
