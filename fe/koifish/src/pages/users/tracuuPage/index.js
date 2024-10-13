import React, { useState } from 'react';
import './style.scss';

const TracuuPage = () => {
    const [activeSection, setActiveSection] = useState('tuVan');

    const showSection = (section) => {
        setActiveSection(section);
    };

    const tuVanKoi = () => {
        // Thực hiện tư vấn Koi
    };

    const traCuu = () => {
        // Thực hiện tra cứu
    };

    return (
        <div className="container">
            <article className="main">
                <section className="functionality">
                    <input
                        type="radio"
                        id="functionality__btn-tuVan"
                        name="toggle"
                        checked={activeSection === 'tuVan'}
                        readOnly
                    />
                    <button
                        className="functionality__btn"
                        onClick={() => showSection('tuVan')}
                    >
                        Tư Vấn
                    </button>

                    <input
                        type="radio"
                        id="functionality__btn-traCuu"
                        name="toggle"
                        checked={activeSection === 'traCuu'}
                        readOnly
                    />
                    <button
                        className="functionality__btn"
                        onClick={() => showSection('traCuu')}
                    >
                        Đánh Giá
                    </button>
                </section>

                {activeSection === 'tuVan' && (
                    <section id="tuVan" className="section active">
                        <article className="layout">
                            <section className="layout__input">
                                <h2 className="input-title">Tư vấn cá Koi phong thủy</h2>
                                <form className="input-group">
                                    <label htmlFor="birthDate">Ngày sinh:</label>
                                    <fieldset className="birthDate">
                                        <select className="birthDay" name="day"></select>
                                        <select className="birthMonth" name="month"></select>
                                        <select className="birthYear" name="year"></select>
                                    </fieldset>
                                </form>
                                <form className="input-group">
                                    <label htmlFor="birthHour">Giờ sinh:</label>
                                    <select id="birthHour">
                                        {['Tý (23g - 1g)', 'Sửu (1g - 3g)', 'Dần (3g - 5g)', 'Mão (5g - 7g)', 'Thìn (7g - 9g)', 'Tý (9g - 11g)', 'Ngọ (11g - 13g)', 'Mùi (13g - 15g)', 'Thân (15g - 17g)', 'Dậu (17g - 19g)', 'Tuất (19g - 21g)', 'Hợi (21g - 23g)'].map(option => (
                                            <option key={option} value={option.split(' ')[0]}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </form>
                                <form className="input-group">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select id="gender">
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                    </select>
                                </form>
                                <button className="btnResult" onClick={tuVanKoi}>
                                    Tư Vấn
                                </button>
                            </section>
                            <section className="layout__result">
                                <section id="tuVanResult" className="result"></section>
                                <section id="koiInfo" className="koi-info"></section>
                            </section>
                        </article>
                    </section>
                )}

                {activeSection === 'traCuu' && (
                    <section id="traCuu" className="section">
                        <article className="layout">
                            <section className="layout__input">
                                <h2 className="input-title">Tra Cứu Độ Phù Hợp</h2>
                                <form className="input-group">
                                    <label htmlFor="birthDate">Ngày sinh:</label>
                                    <fieldset className="birthDate">
                                        <select className="birthDay" name="day"></select>
                                        <select className="birthMonth" name="month"></select>
                                        <select className="birthYear" name="year"></select>
                                    </fieldset>
                                </form>
                                <form className="input-group">
                                    <label htmlFor="birthHour">Giờ sinh:</label>
                                    <select id="birthHour">
                                        {['Tý (23g - 1g)', 'Sửu (1g - 3g)', 'Dần (3g - 5g)', 'Mão (5g - 7g)', 'Thìn (7g - 9g)', 'Tý (9g - 11g)', 'Ngọ (11g - 13g)', 'Mùi (13g - 15g)', 'Thân (15g - 17g)', 'Dậu (17g - 19g)', 'Tuất (19g - 21g)', 'Hợi (21g - 23g)'].map(option => (
                                            <option key={option} value={option.split(' ')[0]}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </form>
                                <form className="input-group">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select id="gender">
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                    </select>
                                </form>
                                <form className="input-group">
                                    <label htmlFor="species">Loài cá Koi hiện tại:</label>
                                    <select id="species">
                                        <option value="">Chọn loài cá Koi</option>
                                    </select>
                                </form>

                                <form className="input-group">
                                    <label htmlFor="quantity">Số lượng:</label>
                                    <select id="quantity">
                                        <option value="">Chọn số lượng</option>
                                        <option value="even">Chẵn</option>
                                        <option value="odd">Lẻ</option>
                                    </select>
                                </form>

                                <form className="input-group">
                                    <label htmlFor="pondShape">Hình dạng ao:</label>
                                    <select id="pondShape">
                                        <option value="">Chọn hình dạng ao</option>
                                    </select>
                                </form>

                                <form className="input-group">
                                    <label htmlFor="location">Vị trí ao:</label>
                                    <select id="location">
                                        <option value="">Chọn vị trí ao</option>
                                    </select>
                                </form>

                                <form className="input-group">
                                    <label htmlFor="direction">Hướng ao:</label>
                                    <select id="direction">
                                        <option value="">Chọn hướng ao</option>
                                    </select>
                                </form>
                                <button className="btnResult" onClick={traCuu}>
                                    Tra Cứu
                                </button>
                            </section>
                            <section className="layout__result">
                                <section id="traCuuResult" className="result"></section>
                            </section>
                        </article>
                    </section>
                )}
            </article>
        </div>
    );
};

export default TracuuPage;
