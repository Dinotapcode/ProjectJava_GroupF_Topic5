import React from "react";
import TuVanPage from "./TuVanPage";
import TraCuuPage from "./TraCuuPage";
import "./style.scss";

const IndexPage = () => {
    const [activePage, setActivePage] = React.useState("tuVan");

    return (
        <div>
            <button onClick={() => setActivePage("tuVan")}>Tư Vấn</button>
            <button onClick={() => setActivePage("traCuu")}>Tra Cứu</button>
            {activePage === "tuVan" ? <TuVanPage /> : <TraCuuPage />}
        </div>
    );
};

export default IndexPage;
