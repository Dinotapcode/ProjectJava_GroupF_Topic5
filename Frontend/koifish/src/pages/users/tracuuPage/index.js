import React, { useState } from 'react';
import TuVan from '../../../components/TuVan';
import TraCuu from '../../../components/TraCuu';
import './style.scss';

function TracuuPage() {
    const [activeSection, setActiveSection] = useState('tuVan'); // Quản lý trạng thái trang hiển thị

    return (
        <div className="container">
            <article className="tracuu-container">
                <section className="functionality">
                    <input
                        type="radio"
                        id="functionality__btn-tuVan"
                        name="toggle"
                        checked={activeSection === 'tuVan'}
                        onChange={() => setActiveSection('tuVan')}
                    />
                    <button
                        className="functionality__btn"
                        onClick={() => setActiveSection('tuVan')}
                    >
                        Tư Vấn
                    </button>

                    <input
                        type="radio"
                        id="functionality__btn-traCuu"
                        name="toggle"
                        checked={activeSection === 'traCuu'}
                        onChange={() => setActiveSection('traCuu')}
                    />
                    <button
                        className="functionality__btn"
                        onClick={() => setActiveSection('traCuu')}
                    >
                        Tra Cứu
                    </button>
                </section>

                {activeSection === 'tuVan' ? <TuVan /> : <TraCuu />}
            </article>
        </div>
    );
}

export default TracuuPage;