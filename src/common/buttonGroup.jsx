import React, { Component } from "react";

class ButtonGroup extends Component {
  render() {
    const { name, array, selected, onSelect } = this.props;
    const buttons = array.map(b => {
      return (
        <button
          key={b.label}
          type="button"
          value={b.value}
          className={selected === b.value ? "btn btn-primary" : "btn btn-light"}
          onClick={onSelect}
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
