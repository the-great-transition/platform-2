import React, { Component } from "react";
import Helmet from "react-helmet";
import Comments from "./comments";
import TextDisplay from "../common/textDisplay";
import { toHTML } from "../utilities/string";
import {
  part as lang_panelist,
  panelists as lang_panelists,
  panelistCreate as lang_panelistCreate
} from "../language/fr";

class Panelist extends Component {
  componentDidMount() {
    if (this.props.location.tableArray) {
      const { location } = this.props;
      this.props.onNavDisable(location.tableArray, location.tableIndex);
    }
  }

  handleNav = e => {
    const { value } = e.currentTarget;
    const { location } = this.props;
    const limits = this.props.onNavDisable(
      location.tableArray,
      location.tableIndex
    );
    const goTo = limits[value];
    if (goTo) {
      const { tableArray } = location;
      const index = tableArray.findIndex(a => a.id === goTo);
      this.props.onNavDisable(tableArray, tableArray[index].id);
      this.props.onNav({
        tableArray: tableArray,
        tableIndex: tableArray[index].id,
        pathname:
          "/panelists/" + tableArray[index].id + "-" + tableArray[index].slug
      });
    }
  };

  render() {
    const {
      data,
      navigationDisabled,
      user,
      onNavEscape,
      onStatus
    } = this.props;
    const fullname = data.part_fname + " " + data.part_lname;
    const navigationHide =
      navigationDisabled.previous && navigationDisabled.next ? true : false;
    return (
      <React.Fragment>
        <Helmet>
          <title>{toHTML(fullname)}</title>
        </Helmet>
        <div className="row">
          <div className="col-8">
            <h3>{fullname}</h3>
            <h5>
              <i>{lang_panelists.status[data.part_status].label}</i>
            </h5>
          </div>
          <div className="col-4 my-auto" align="right">
            <div className="btn-group">
              <button
                className="btn btn-dark"
                value="previous"
                disabled={navigationDisabled.previous}
                hidden={navigationHide}
                style={{
                  width: "7em"
                }}
                onClick={this.handleNav}
              >
                {lang_panelist.previous}
              </button>

              <button
                className="btn btn-dark"
                value="next"
                disabled={navigationDisabled.next}
                hidden={navigationHide}
                style={{ width: "7em", marginLeft: 5, marginRight: 5 }}
                onClick={this.handleNav}
              >
                {lang_panelist.next}
              </button>
              <button
                className="btn btn-dark"
                value="escape"
                style={{ width: "3em" }}
                onClick={onNavEscape}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <div className="row">
              <div className="col-6">
                <TextDisplay
                  name="description"
                  label={lang_panelist.city}
                  value={toHTML(data.part_city)}
                />
                <TextDisplay
                  name="description"
                  label={lang_panelist.email}
                  value={toHTML(data.part_email)}
                />
                <TextDisplay
                  name="description"
                  label={lang_panelist.affiliation}
                  value={toHTML(data.part_affiliation)}
                />
              </div>
              <div className="col-6">
                <TextDisplay
                  name="description"
                  label={lang_panelist.country}
                  value={toHTML(data.part_country)}
                />
                <TextDisplay
                  name="description"
                  label={lang_panelist.gender}
                  value={toHTML(data.part_gender)}
                />
                <TextDisplay
                  name="description"
                  label={lang_panelist.minority}
                  value={toHTML(data.part_minority)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextDisplay
                  name="description"
                  label={lang_panelist.bio}
                  value={toHTML(data.part_bio)}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Panelist;
