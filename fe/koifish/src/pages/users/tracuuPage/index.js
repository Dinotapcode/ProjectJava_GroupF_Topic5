import React, { useState } from 'react';
import TuVan from '../../../components/TuVan';
import TraCuu from '../../../components/TraCuu';
import './style.scss';

function TracuuPage() {
    const [activeSection, setActiveSection] = useState('tuVan'); // Quản lý trạng thái trang hiển thị

    return (
        <div className="container">
            <div className="functionality">
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
                    Đánh Giá
                </button>
            </div>

            {activeSection === 'tuVan' ? <TuVan /> : <TraCuu />}
        </div>
    );
}

export default TracuuPage;
