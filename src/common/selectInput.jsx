import React from "react";
import Select from "react-select";

const SelectInput = ({ name, label, value, options, onChange, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        name={name}
        value={value}
        options={options}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default SelectInput;
