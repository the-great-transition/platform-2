import React from "react";
import TextareaAutosize from "react-autosize-textarea";

const TextDisplay = ({ name, label, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <TextareaAutosize
        className="form-control"
        disabled
        style={{ backgroundColor: "white" }}
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
};

export default TextDisplay;
