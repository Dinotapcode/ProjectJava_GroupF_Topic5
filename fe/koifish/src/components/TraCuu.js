import React, { useState } from 'react';

function TraCuu() {
    const [species, setSpecies] = useState('');
    const [quantity, setQuantity] = useState('');
    const [result, setResult] = useState('');

    const handleSearch = () => {
        if (species === 'Cá Koi Showa' && quantity === 'Chẵn') {
            setResult('Cá Koi của bạn phù hợp!');
        } else {
            setResult('Cần điều chỉnh cá Koi để phù hợp.');
        }
    };

    return (
        <div className="layout">
            <div className="layout__input">
                <h2>Tra Cứu Độ Phù Hợp</h2>
                <select onChange={(e) => setSpecies(e.target.value)}>
                    <option value="">Chọn loài cá</option>
                    <option value="Cá Koi Showa">Cá Koi Showa</option>
                    <option value="Cá Koi Asagi">Cá Koi Asagi</option>
                </select>

                <select onChange={(e) => setQuantity(e.target.value)}>
                    <option value="">Chọn số lượng</option>
                    <option value="Chẵn">Chẵn</option>
                    <option value="Lẻ">Lẻ</option>
                </select>

                <button onClick={handleSearch}>Tra Cứu</button>
            </div>

            {result && <div className="layout__result">{result}</div>}
        </div>
    );
}

export default TraCuu;
