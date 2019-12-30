import React, { Component } from "react";
import Helmet from "react-helmet";
import Select from "react-select";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { associate as lang_associate } from "../language/fr";

var _ = require("lodash");

class AssociatePart extends Component {
  state = {
    submissions: {},
    panelists: {},
    submParts: null,
    selectedSubm: null,
    selectedPart: null
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const submissions = await getResource("subm");
    const panelists = await getResource("part");
    this.setState({ submissions, panelists });
  }

  async getsubmParts() {
    const { value: id } = this.state.selectedSubm;
    const subm = await getResource("subm", id);
    if (subm.parts.length > 0) {
      this.setState({ submParts: subm.parts });
    } else {
      this.setState({ submParts: null });
    }
  }

  handleselectedSubm = e => {
    if (e === null) {
      this.setState({ selectedSubm: null, submParts: null });
    } else {
      this.setState({ selectedSubm: e }, () => {
        this.getsubmParts();
      });
    }
  };

  handleSelectedPart = e => {
    if (e === null) {
      this.setState({ selectedPart: null });
    } else {
      this.setState({ selectedPart: e });
    }
  };

  async association(id, selectedPart, del) {
    const data = {
      type: "part",
      id: id,
      part_id: selectedPart,
      part_type: 0,
      delete: del
    };
    try {
      await postResource("associate", data);
      this.populate();
      this.getsubmParts();
      this.setState({ selectedPart: null });
    } catch (ex) {
      console.log(ex);
    }
  }

  handleAssociate = () => {
    this.association(
      this.state.selectedSubm.value,
      this.state.selectedPart.value,
      false
    );
  };

  handleDissociate(e) {
    const { part_id } = e;
    this.association(this.state.selectedSubm.value, part_id, true);
  }

  render() {
    const {
      submissions,
      panelists,
      selectedSubm,
      selectedPart,
      submParts
    } = this.state;
    let submData = [];
    let partData = [];
    if (submissions && submissions.length >= 0) {
      const submData_filtered = submissions.filter(s => {
        return s.subm_type !== "1";
      });
      const submData_unsorted = submData_filtered.map(s => {
        const subm = {
          label: "#" + s.subm_id + " " + toHTML(s.subm_title),
          title: toHTML(s.subm_title),
          value: s.subm_id,
          data: s
        };
        return subm;
      });
      submData = _.orderBy(submData_unsorted, "title", "asc");
      const partData_unsorted = panelists.map(p => {
        const label = p.part_city
          ? p.part_fname + " " + p.part_lname + ", " + p.part_city
          : p.part_fname + " " + p.part_lname;
        const part = {
          label: toHTML(label),
          title: toHTML(p.part_fname + " " + p.part_lname),
          value: p.part_id,
          data: p
        };
        return part;
      });
      partData = _.orderBy(partData_unsorted, "title", "asc");
    }
    return (
      <div>
        <Helmet>
          <title>{lang_associate.panelists_title}</title>
        </Helmet>
        <h2>{lang_associate.panelists_header}</h2>
        <div className="row">
          <div className="col">
            <Select
              options={submData}
              value={selectedSubm}
              onChange={this.handleselectedSubm}
              isClearable="true"
            />
            {selectedSubm ? (
              <React.Fragment>
                <div className="row">
                  <div className="col">
                    <h4 style={{ marginTop: 20 }}>
                      {toHTML(selectedSubm.data.subm_title)}
                    </h4>
                    <h5>
                      <i>{toHTML(selectedSubm.data.user_name)}</i>
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {selectedSubm ? (
                      <React.Fragment>
                        <h5 style={{ marginTop: 20 }}>
                          {lang_associate.addPart}
                        </h5>
                        <Select
                          options={partData}
                          value={selectedPart}
                          onChange={this.handleSelectedPart}
                          isClearable="true"
                        />
                        {selectedPart ? (
                          <button
                            className="button btn btn-block btn-success"
                            onClick={this.handleAssociate}
                          >
                            {lang_associate.confirmAssociate}
                          </button>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {submParts ? (
                      <h5 style={{ marginTop: 20 }}>{lang_associate.parts}</h5>
                    ) : (
                      ""
                    )}
                    {submParts
                      ? submParts.map((p, key) => {
                          let parity = p.part_gender ? p.part_gender : "";
                          parity = p.part_minority
                            ? parity + ", " + p.part_minority
                            : parity;
                          return (
                            <table className="table table-bordered" key={key}>
                              <tbody>
                                <tr>
                                  <td>
                                    {toHTML(
                                      p.part_fname +
                                        " " +
                                        p.part_lname +
                                        " | " +
                                        parity
                                    )}
                                  </td>
                                  <td style={{ width: "5em" }} rowSpan={2}>
                                    <button
                                      className="button btn btn-warning"
                                      onClick={() => this.handleDissociate(p)}
                                    >
                                      {lang_associate.dissociate}
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>{toHTML(p.part_affiliation)}</td>
                                </tr>
                              </tbody>
                            </table>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AssociatePart;
