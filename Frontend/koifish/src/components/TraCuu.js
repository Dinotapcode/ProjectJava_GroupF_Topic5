import React, { useState, useEffect, useCallback } from "react";
import DateAndSex from "./DateAndSex";
import ResultSection from "./ResultSection";

const TraCuu = () => {
    const [koiSpeciesOptions, setKoiSpeciesOptions] = useState([]);
    const [pondShapeOptions, setPondShapeOptions] = useState([]);
    const [koiSpecies, setKoiSpecies] = useState("");
    const [koiQuantity, setKoiQuantity] = useState("");
    const [pondShape, setPondShape] = useState("");
    const [location, setLocation] = useState("");
    const [direction, setDirection] = useState("");
    const [result, setResult] = useState(null);

    const [dateAndSex, setDateAndSex] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch koi species and pond shape options from API
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const koiSpeciesResponse = await fetch("http://localhost:8083/api/v1/user/koiSpecies");
                const pondShapeResponse = await fetch("http://localhost:8083/api/v1/user/pondShape");

                if (!koiSpeciesResponse.ok || !pondShapeResponse.ok) {
                    throw new Error("Không thể truy cập API");
                }

                const koiSpeciesData = await koiSpeciesResponse.json();
                const pondShapeData = await pondShapeResponse.json();

                setKoiSpeciesOptions(koiSpeciesData);
                setPondShapeOptions(pondShapeData);
            } catch (err) {
                setError("Có lỗi xảy ra khi truy cập API.");
            }
        };

        fetchOptions();
    }, []);

    // Memoize the handleResult function to prevent unnecessary re-renders
    const handleResult = useCallback((result) => {
        setDateAndSex(result);
    }, []);

    const handleLookup = async () => {
        if (!dateAndSex?.birthDate || !dateAndSex?.gender || !koiSpecies || !koiQuantity || !pondShape || !location || !direction) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8083/api/v1/user/compatibility?birthDate=${dateAndSex.birthDate}&gender=${dateAndSex.gender}&species=${koiSpecies}&quantity=${koiQuantity}&pondShape=${pondShape}&location=${location}&direction=${direction}`
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


    const koiQuantityOptions = ["Chẵn", "Lẻ"];
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

    return (
        <section id="traCuu">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input__title">Tra Cứu Độ Phù Hợp</h2>
                    <DateAndSex onResult={handleResult} />

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

                    <button className="input__btnResult" onClick={handleLookup} disabled={loading}>
                        {loading ? "Đang tra cứu..." : "Tra cứu"}
                    </button>
                </section>

                <section className="layout__result">
                    {result ? (
                        <div id="traCuuResult" className="result">
                            <h3>Mức độ phù hợp với cá Koi của bạn</h3>
                            <div className="result__percent">
                                <div className="percent">
                                    <div className="percent-value">{result.score}%</div>
                                    <div
                                        className="percent-loading"
                                        style={{ top: `calc(100% - ${result.score}% - 20%)` }}
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