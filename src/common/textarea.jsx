import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea className="form-control" id={name} name={name} {...rest} />
      {error && <div className="alert alert-danger">{error.message}</div>}
    </div>
  );
};

export default TextArea;
