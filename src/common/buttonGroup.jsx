import React, { Component } from "react";

class ButtonGroup extends Component {
  render() {
    const { name, array, selected, onSelect, ...rest } = this.props;
    const buttons = array.map(b => {
      return (
        <button
          key={b.label}
          name={name}
          type="button"
          value={b.value}
          className={selected === b.value ? "btn btn-primary" : "btn btn-light"}
          onClick={onSelect}
          {...rest}
        >
          {b.label}
        </button>
      );
    });
    return (
      <div className="btn-group" style={{ padding: 10 }} id={name}>
        {buttons}
      </div>
    );
  }
}

export default ButtonGroup;
