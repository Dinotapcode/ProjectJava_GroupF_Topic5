import React, { useState } from 'react';
import BirthDateSelector from './BirthDateSelector';

function TuVan() {
    const [gender, setGender] = useState('Nam'); // Giả định giới tính là 'Nam' ban đầu
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState(null);

    const calculateElement = (gender, birthDate) => {
        const year = new Date(birthDate).getFullYear();
        const elementCycle = ['Kim', 'Thủy', 'Mộc', 'Hỏa', 'Thổ'];
        return elementCycle[(year % 10) % 5];
    };

    const getAdvice = (element) => {
        const adviceData = {
            Kim: { species: 'Cá Koi Showa', quantity: 'Chẵn', shape: 'Vuông' },
            Thủy: { species: 'Cá Koi Asagi', quantity: 'Lẻ', shape: 'Tròn' },
            Mộc: { species: 'Cá Koi Midori', quantity: 'Chẵn', shape: 'Chữ nhật' },
            Hỏa: { species: 'Cá Koi Kohaku', quantity: 'Lẻ', shape: 'Tam giác' },
            Thổ: { species: 'Cá Koi Sanke', quantity: 'Chẵn', shape: 'Ovan' },
        };
        return adviceData[element] || {};
    };

    const handleConsult = () => {
        if (!birthDate) {
            alert('Vui lòng chọn ngày sinh!');
            return;
        }
        const element = calculateElement(gender, birthDate);
        const advice = getAdvice(element);
        setResult({
            element,
            ...advice,
        });
    };

    const handleBirthDateChange = (date) => {
        setBirthDate(date);
    };

    return (
        <div className="layout">
            <div className="layout__input">
                <h2>Tư vấn cá Koi phong thủy</h2>

                {/* Truyền callback để lấy ngày sinh */}
                <BirthDateSelector onBirthDateChange={handleBirthDateChange} />

                <button onClick={handleConsult}>Tư Vấn</button>
            </div>

            {result && (
                <div className="layout__result">
                    <p>Mệnh: {result.element}</p>
                    <p>Loài cá phù hợp: {result.species}</p>
                    <p>Số lượng: {result.quantity}</p>
                    <p>Hình dạng ao: {result.shape}</p>
                </div>
            )}
        </div>
    );
}

export default TuVan;
