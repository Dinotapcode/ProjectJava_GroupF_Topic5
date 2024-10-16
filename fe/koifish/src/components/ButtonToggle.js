import React from "react";

const ButtonToggle = ({ label, onClick, checked, id }) => {
    return (
        <div>
            <input type="radio" id={id} name="toggle" checked={checked} readOnly />
            <button className="functionality__btn" onClick={onClick}>
                {label}
            </button>
        </div>
    );
};

export default ButtonToggle;
