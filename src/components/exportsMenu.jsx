import React from "react";
import { Link } from "react-router-dom";
import { exports as lang_exports } from "../language/fr";

const ExportsMenu = () => {
  return (
    <React.Fragment>
      <Link className="btn btn-block btn-dark" to="/exports">
        {lang_exports.menu_comments}
      </Link>
    </React.Fragment>
  );
};

export default ExportsMenu;
