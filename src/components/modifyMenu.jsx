import React from "react";
import { Link } from "react-router-dom";
import { modify as lang_modify } from "../language/fr";

const ModifyMenu = () => {
  return (
    <React.Fragment>
      <Link className="btn btn-block btn-dark" to="/modify/submissions">
        {lang_modify.menu_submissions}
      </Link>
      <Link className="btn btn-block btn-dark" to="/modify/panelists">
        {lang_modify.menu_panelists}
      </Link>
    </React.Fragment>
  );
};

export default ModifyMenu;
