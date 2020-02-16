import React from "react";

const Checkbox = ({ name, label, ...rest }) => {
  return (
    <div className="form-check">
      <label className="form-check-label">
        <input
          type="checkbox"
          className="form-check-input"
          name={name}
          {...rest}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
