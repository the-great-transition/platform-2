import React, { Component } from "react";
import Helmet from "react-helmet";
import { getResource } from "../services/resourceService";
import { associate as lang_associate } from "../language/fr";

class AssociatePart extends Component {
  state = {};
  render() {
    return (
      <div>
        <Helmet>
          <title>{lang_associate.panelists_title}</title>
        </Helmet>
        <h2>À venir</h2>
      </div>
    );
  }
}

export default AssociatePart;
