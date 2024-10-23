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
                    <button
                        className={`functionality__btn ${activeSection === 'tuVan' ? 'active' : ''}`}
                        onClick={() => setActiveSection('tuVan')}
                    >
                        Tư Vấn
                    </button>

                    <button
                        className={`functionality__btn ${activeSection === 'traCuu' ? 'active' : ''}`}
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