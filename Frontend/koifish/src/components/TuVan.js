import React, { useState } from 'react';
import BirthDateSelector from './BirthDateSelector';
import ResultSection from './ResultSection';

function calculateElement(gender, birthDate) {
    const birthYear = new Date(birthDate).getFullYear();
    const elementCycle = ["Kim", "Thủy", "Mộc", "Hỏa", "Thổ"];
    const elementIndex = (birthYear % 10) % 5;
    return elementCycle[elementIndex];
}

function getAdvice(element) {
    const adviceData = {
        Kim: {
            koiSpecies: "Cá Koi Showa",
            koiQuantity: "Chẵn",
            pondShape: "Vuông",
            pondLocation: "Phía Tây",
            pondDirection: "Tây Nam",
            koiImage: "link_to_showa_image.jpg",
            koiInfo: "Cá Koi Showa là loài cá có màu sắc rực rỡ, mang lại may mắn cho gia chủ.",
        },
        Thủy: {
            koiSpecies: "Cá Koi Asagi",
            koiQuantity: "Lẻ",
            pondShape: "Tròn",
            pondLocation: "Phía Bắc",
            pondDirection: "Bắc",
            koiImage: "link_to_asagi_image.jpg",
            koiInfo: "Cá Koi Asagi có màu sắc độc đáo và biểu tượng cho sự bình yên.",
        },
        Mộc: {
            koiSpecies: "Cá Koi Kohaku",
            koiQuantity: "Chẵn",
            pondShape: "Hình bầu dục",
            pondLocation: "Phía Đông",
            pondDirection: "Đông Nam",
            koiImage: "link_to_kohaku_image.jpg",
            koiInfo: "Cá Koi Kohaku mang lại sự thịnh vượng và giàu có.",
        },
        Hỏa: {
            koiSpecies: "Cá Koi Shiro Utsuri",
            koiQuantity: "Lẻ",
            pondShape: "Tam giác",
            pondLocation: "Phía Nam",
            pondDirection: "Nam",
            koiImage: "link_to_tancho_image.jpg",
            koiInfo: "Cá Koi Tancho là biểu tượng của sức mạnh và quyết tâm.",
        },
        Thổ: {
            koiSpecies: "Cá Koi Sanke",
            koiQuantity: "Chẵn",
            pondShape: "Chữ nhật",
            pondLocation: "Phía Tây Nam",
            pondDirection: "Đông Bắc",
            koiImage: "link_to_sanke_image.jpg",
            koiInfo: "Cá Koi Sanke mang lại sự ổn định và bền vững cho gia đình.",
        },
    };
    return adviceData[element];
}

function TuVan() {
    const [gender, setGender] = useState('male');
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState('');
    const [koiInfo, setKoiInfo] = useState('');
    const [showDefault, setShowDefault] = useState(true); // State để hiển thị nội dung mặc định

    const handleBirthDateChange = (newBirthDate) => {
        setBirthDate(newBirthDate);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleConsult = () => {
        if (!birthDate) {
            alert("Vui lòng nhập ngày sinh.");
            return;
        }

        const userElement = calculateElement(gender, birthDate);
        const advice = getAdvice(userElement);

        const resultText = `<p>Dựa trên thông tin bạn cung cấp, mệnh của bạn là <strong>${userElement}</strong>. 
                         Loài cá Koi phù hợp nhất với bạn là <strong>${advice.koiSpecies}</strong>, 
                         với số lượng <strong>${advice.koiQuantity}</strong>.</p>
                         <p>Ao cá nên có hình dạng <strong>${advice.pondShape}</strong>, 
                         được đặt ở vị trí <strong>${advice.pondLocation}</strong> quay về hướng <strong>${advice.pondDirection}</strong> 
                         sẽ mang lại sự thịnh vượng cho bạn.</p>`;

        const koiInfoText = `<h3>Thông tin về loài cá:</h3>
                          <p>${advice.koiInfo}</p>
                          <img src="${advice.koiImage}" alt="${advice.koiSpecies}">`;

        setResult(resultText);
        setKoiInfo(koiInfoText);
        setShowDefault(false);
    };

    return (
        <section id="tuVan">
            <article className="layout">
                <section className="layout__input">
                    <h2 className="input-title">Tư vấn cá Koi phong thủy</h2>
                    <BirthDateSelector onBirthDateChange={handleBirthDateChange} />
                    <form className="input-group">
                        <label htmlFor="gender">Giới tính:</label>
                        <select id="gender" value={gender} onChange={handleGenderChange}>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </form>
                    <button class="btnResult" onClick={handleConsult}>Tư Vấn</button>
                </section>
                <section className="layout__result">
                    {showDefault ? (
                        <ResultSection />
                    ) : (
                        <>
                            <section id="tuVanResult" className="result" dangerouslySetInnerHTML={{ __html: result }}></section>
                            <section id="koiInfo" className="koi-info" dangerouslySetInnerHTML={{ __html: koiInfo }}></section>
                        </>
                    )}
                </section>
            </article>
        </section>
    );
}

export default TuVan;
