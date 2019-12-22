import React, { Component } from "react";
import Login from "./Login";
import Platform from "./Platform";

class App extends Component {
  state = {
    logged: true,
    login: {
      id: 0,
      name: "Paolo",
      role: 0
    }
  };
  render() {
    return (
      <div className="container">
        {this.state.logged === true ? (
          <Platform login={this.state.login} />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
