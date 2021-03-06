import React, { Component } from "react";
import Helmet from "react-helmet";
import SelectInput from "./../common/selectInput";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { associate as lang_associate } from "../language/fr";

var _ = require("lodash");

class AssociateComm extends Component {
  state = {
    submissions: {},
    submComms: null,
    selectedPanel: null,
    selectedComm: null
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const submissions = await getResource("subm");
    this.setState({ submissions });
  }

  async getsubmComms() {
    const { value: id } = this.state.selectedPanel;
    const subm = await getResource("subm", id);
    if (subm.comms.length > 0) {
      this.setState({ submComms: subm.comms });
    } else {
      this.setState({ submComms: null });
    }
  }

  handleSelectedPanel = e => {
    if (e === null) {
      this.setState({ selectedPanel: null, submComms: null });
    } else {
      this.setState({ selectedPanel: e }, () => {
        this.getsubmComms();
      });
    }
  };

  handleSelectedComm = e => {
    if (e === null) {
      this.setState({ selectedComm: null });
    } else {
      this.setState({ selectedComm: e });
    }
  };

  async association(id, selectedComm) {
    const data = {
      type: "comm",
      id: id,
      comm_id: selectedComm
    };
    try {
      await postResource("associate", data);
      this.populate();
      this.getsubmComms();
      this.setState({ selectedComm: null });
    } catch (ex) {
      console.log(ex);
    }
  }

  handleAssociate = () => {
    this.association(
      this.state.selectedPanel.value,
      this.state.selectedComm.value
    );
  };

  handleDissociate(e) {
    const { subm_id } = e;
    this.association(0, subm_id);
  }

  render() {
    const { submissions, selectedPanel, selectedComm, submComms } = this.state;
    let panelData = [];
    let commData = [];
    if (submissions && submissions.length >= 0) {
      const panelData_filtered = submissions.filter(s => {
        return s.subm_type === "1";
      });
      const panelData_unsorted = panelData_filtered.map(s => {
        const subm = {
          label: "#" + s.subm_id + " " + toHTML(s.subm_title),
          title: toHTML(s.subm_title),
          value: s.subm_id,
          data: s
        };
        return subm;
      });
      panelData = _.orderBy(panelData_unsorted, "title", "asc");
      const commData_filtered = submissions.filter(s => {
        return s.subm_type === "0";
      });
      const commData_unsorted = commData_filtered.map(s => {
        const subm = {
          label:
            "#" + s.subm_id + " " + toHTML(s.subm_title) + " | " + s.user_name,
          title: toHTML(s.subm_title),
          value: s.subm_id,
          data: s
        };
        return subm;
      });
      commData = _.orderBy(commData_unsorted, "title", "asc");
    }
    return (
      <div>
        <Helmet>
          <title>{lang_associate.comms_title}</title>
        </Helmet>
        <h2>{lang_associate.comms_header}</h2>
        <div className="row">
          <div className="col">
            <SelectInput
              name="panel"
              label={lang_associate.panel_select}
              options={panelData}
              value={selectedPanel}
              onChange={this.handleSelectedPanel}
              isClearable="true"
            />
            {selectedPanel ? (
              <React.Fragment>
                <div className="row">
                  <div className="col">
                    <h4 style={{ marginTop: 20 }}>
                      {toHTML(selectedPanel.data.subm_title)}
                    </h4>
                    <h5>
                      <i>{toHTML(selectedPanel.data.user_name)}</i>
                    </h5>
                    {lang_associate.average +
                      " : " +
                      Math.ceil(selectedPanel.data.average * 100) / 100}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {selectedPanel ? (
                      <React.Fragment>
                        <h5 style={{ marginTop: 20 }}>
                          {lang_associate.addComm}
                        </h5>
                        <SelectInput
                          name="comm"
                          label={lang_associate.comms_select}
                          options={commData}
                          value={selectedComm}
                          onChange={this.handleSelectedComm}
                          isClearable="true"
                        />
                        {selectedComm ? (
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
                    {submComms ? (
                      <h5 style={{ marginTop: 20 }}>{lang_associate.comms}</h5>
                    ) : (
                      ""
                    )}
                    {submComms
                      ? submComms.map((c, key) => {
                          return (
                            <table className="table table-bordered" key={key}>
                              <tbody>
                                <tr>
                                  <td colSpan={c.parts.length}>
                                    {toHTML(c.subm_title)}
                                  </td>
                                  <td style={{ width: "5em" }} rowSpan={2}>
                                    <button
                                      className="button btn btn-warning"
                                      onClick={() => this.handleDissociate(c)}
                                    >
                                      {lang_associate.dissociate}
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  {c.parts.map((p, key) => {
                                    let parity = p.part_gender
                                      ? p.part_gender
                                      : "";
                                    parity = p.part_minority
                                      ? parity + ", " + p.part_minority
                                      : parity;
                                    return (
                                      <td key={key}>
                                        {toHTML(
                                          p.part_fname +
                                            " " +
                                            p.part_lname +
                                            " | " +
                                            parity
                                        )}
                                      </td>
                                    );
                                  })}
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

export default AssociateComm;
