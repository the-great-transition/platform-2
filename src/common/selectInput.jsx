import React, { Component } from "react";
import Select from "react-select";

class SelectInput extends Component {
  render() {
    const { name, label, value, options } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Select
          id={name}
          name={name}
          value={value}
          options={options}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default SelectInput;
