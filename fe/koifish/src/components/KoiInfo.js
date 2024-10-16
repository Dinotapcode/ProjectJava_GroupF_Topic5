import React from "react";

const KoiInfo = ({ koiInfo }) => {
    return (
        <section id="koiInfo" className="koi-info">
            <h3>Thông tin về loài cá:</h3>
            <p>{koiInfo.info}</p>
            <img src={koiInfo.image} alt={koiInfo.species} />
        </section>
    );
};

export default KoiInfo;
