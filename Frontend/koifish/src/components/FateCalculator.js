import React, { useState, useEffect } from "react";

// Hàm tính mệnh dựa trên năm sinh và giới tính
function calculateElement(gender, birthYear) {
    const elementCycle = ["Kim", "Thủy", "Mộc", "Hỏa", "Thổ"];
    const elementIndex = (birthYear % 10) % 5;

    // Điều chỉnh mệnh cho nam và nữ theo quy luật âm dương
    return gender === "male"
        ? elementCycle[elementIndex]
        : elementCycle[(elementIndex + 2) % 5];
}

const FateCalculator = ({ onResult }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const minYear = currentYear - 100;

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [birthHour, setBirthHour] = useState("");
    const [gender, setGender] = useState("");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: currentYear - minYear + 1 }, (_, i) => currentYear - i);

    const hourOptions = [
        "Tý (23g - 1g)", "Sửu (1g - 3g)", "Dần (3g - 5g)", "Mão (5g - 7g)",
        "Thìn (7g - 9g)", "Tỵ (9g - 11g)", "Ngọ (11g - 13g)", "Mùi (13g - 15g)",
        "Thân (15g - 17g)", "Dậu (17g - 19g)", "Tuất (19g - 21g)", "Hợi (21g - 23g)"
    ];

    useEffect(() => {
        // Kiểm tra nếu đủ dữ liệu thì mới tính mệnh
        if (day && month && year && gender) {
            const birthYear = parseInt(year, 10);
            const element = calculateElement(gender, birthYear);
            onResult(element);  // Gửi kết quả về component cha
        } else {
            onResult("");  // Nếu thiếu thông tin, gửi giá trị rỗng
        }
    }, [day, month, year, gender, onResult]);

    return (
        <>
            <form className="input__group">
                <label htmlFor="birthDate">Ngày sinh:</label>
                <fieldset className="birthDate">
                    <select
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

            <form className="input__group">
                <label htmlFor="birthHour">Giờ sinh:</label>
                <select
                    id="birthHour"
                    value={birthHour}
                    onChange={(e) => setBirthHour(e.target.value)}
                >
                    <option value="">Giờ sinh</option>
                    {hourOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>

            <form className="input__group">
                <label htmlFor="gender">Giới tính:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>
            </form>
        </>
    );
};

export default FateCalculator;
