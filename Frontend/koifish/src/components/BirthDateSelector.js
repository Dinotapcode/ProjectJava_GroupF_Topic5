import React, { useState, useEffect } from "react";

const BirthDateSelector = ({ onBirthDateChange }) => {  // Nhận props từ component cha
    const today = new Date();
    const currentYear = today.getFullYear();
    const minYear = currentYear - 100;

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [birthHour, setBirthHour] = useState("");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i);

    const hourOptions = [
        "Tý (23g - 1g)", "Sửu (1g - 3g)", "Dần (3g - 5g)", "Mão (5g - 7g)",
        "Thìn (7g - 9g)", "Tỵ (9g - 11g)", "Ngọ (11g - 13g)", "Mùi (13g - 15g)",
        "Thân (15g - 17g)", "Dậu (17g - 19g)", "Tuất (19g - 21g)", "Hợi (21g - 23g)"
    ];

    // useEffect để gửi giá trị ngày sinh khi có thay đổi
    useEffect(() => {
        if (day && month && year) {
            const birthDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            onBirthDateChange(birthDateString);  // Gửi chuỗi ngày sinh về component cha
        } else {
            onBirthDateChange("");  // Gửi giá trị rỗng nếu chưa đầy đủ
        }
    }, [day, month, year, onBirthDateChange]);

    return (
        <>
            <form className="input-group">
                <label htmlFor="birthDate">Ngày sinh:</label>
                <fieldset className="birthDate">
                    <select
                        className="birthDay"
                        name="day"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    >
                        <option value="">Ngày</option>
                        {days.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>

                    <select
                        className="birthMonth"
                        name="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="">Tháng</option>
                        {months.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>

                    <select
                        className="birthYear"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">Năm</option>
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </fieldset>
            </form>

            <form className="input-group">
                <label htmlFor="birthHour">Giờ sinh:</label>
                <select
                    id="birthHour"
                    value={birthHour}
                    onChange={(e) => setBirthHour(e.target.value)}
                >
                    <option value="">Chọn giờ</option>
                    {hourOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>
        </>
    );
};

export default BirthDateSelector;
