import React from "react";

const InputGroup = ({ label, children }) => {
  return (
    <form className="input-group">
      <label>{label}</label>
      {children}
    </form>
  );
};

export default InputGroup;
