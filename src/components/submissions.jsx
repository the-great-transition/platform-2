import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import ButtonGroup from "../common/buttonGroup";
import { getResource } from "../services/resourceService";
import { toHTML, shorten } from "./../utilities/string";
import {
  materialTable as lang_table,
  submissions as lang_submissions
} from "../language/fr";

class Submissions extends Component {
  state = {
    submissions: {},
    submissionsStatus: "0",
    selectedRow: null
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    if (!localStorage.getItem("submissionsSettings")) {
      this.resetSettings(false);
    }
  }

  componentDidMount() {
    if (localStorage.getItem("submissionsSettings")) {
      const settings = JSON.parse(localStorage.getItem("submissionsSettings"));
      this.setState({ submissionsStatus: settings.submissionsStatus });
    }
    this.populate();
  }

  componentDidUpdate() {
    let settings = JSON.parse(localStorage.getItem("submissionsSettings"));
    settings.submissionsStatus = this.state.submissionsStatus;
    localStorage.setItem("submissionsSettings", JSON.stringify(settings));
  }

  updateSettings() {
    const { state } = this.tableRef.current;
    const unfiltered = state.columns.map((c, k) => {
      const r = {
        key: k,
        filter: c.tableData.filterValue
      };
      return r;
    });
    const filtering = unfiltered.filter(d => {
      return d.filter;
    });
    const settings = {
      submissionsStatus: this.state.submissionsStatus,
      initialPage: state.currentPage,
      pageSize: state.pageSize,
      orderBy: state.orderBy,
      orderDirection: state.orderDirection,
      filtering: filtering
    };
    localStorage.setItem("submissionsSettings", JSON.stringify(settings));
  }

  resetSettings = reload => {
    const settings = {
      submissionsStatus: "0",
      initialPage: 0,
      pageSize: 10,
      orderBy: -1,
      orderDirection: "",
      filtering: {}
    };
    localStorage.setItem("submissionsSettings", JSON.stringify(settings));
    if (reload) {
      window.location = "/submissions";
    }
  };

  async populate() {
    const submissions = await getResource("subm");
    this.setState({ submissions });
  }

  handleSelect = e => {
    const { value: submissionsStatus } = e.currentTarget;
    this.setState({ submissionsStatus });
  };

  render() {
    const { submissions } = this.state;
    const settings = JSON.parse(localStorage.getItem("submissionsSettings"));
    const columns = lang_submissions.columns.map((c, k) => {
      let r = c;
      if (settings.filtering.length > 0) {
        settings.filtering.forEach(f => {
          if (f.key === k) {
            r.defaultFilter = f.filter;
          }
        });
      }
      return r;
    });
    if (settings.orderBy !== -1) {
      columns[settings.orderBy].defaultSort = settings.orderDirection;
    }
    let unfiltered = [];
    if (submissions && submissions.length >= 0) {
      unfiltered = submissions.map((d, i) => {
        const r = {
          key: i,
          id: d.subm_id,
          average: Math.ceil(d.average * 100) / 100,
          rated: d.rated,
          slug: d.subm_slug,
          submittedby: toHTML(d.user_name),
          title: "#" + d.subm_id + " " + toHTML(d.subm_title),
          description: toHTML(d.subm_description),
          language: d.subm_language,
          level: d.subm_level,
          theme: d.subm_theme,
          orientation: d.subm_orientation,
          type: d.subm_type,
          status: d.subm_status,
          parts: d.parts,
          comms: d.comms
        };
        return r;
      });
    }
    const data = unfiltered.filter(d => {
      return d.status === this.state.submissionsStatus;
    });
    return (
      <div>
        <Helmet>
          <title>{lang_submissions.title}</title>
        </Helmet>
        {submissions && submissions.length >= 0 ? (
          <MaterialTable
            tableRef={this.tableRef}
            title={lang_submissions.title}
            localization={lang_table}
            columns={columns}
            data={data}
            detailPanel={rowData => {
              return (
                <div style={{ padding: 20 }}>
                  <h5>{rowData.title}</h5>
                  {shorten(rowData.description, 1000)}
                </div>
              );
            }}
            actions={[
              {
                icon: "listalt",
                tooltip: lang_submissions.view,
                onClick: (event, rowData) => {
                  this.updateSettings();
                  this.props.history.push({
                    tableArray: this.tableRef.current.state.data,
                    tableIndex: rowData.id,
                    pathname: "/submissions/" + rowData.id + "-" + rowData.slug
                  });
                }
              }
            ]}
            options={{
              filtering: true,
              padding: "dense",
              initialPage: settings.initialPage,
              pageSize: settings.pageSize,
              pageSizeOptions: [5, 10, 20, 50, 100]
            }}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar
                    {...props}
                    title={
                      <React.Fragment>
                        <ButtonGroup
                          name="submissionsStatus"
                          array={lang_submissions.status}
                          selected={this.state.submissionsStatus}
                          onSelect={this.handleSelect}
                        />
                        <button
                          className="btn btn-warning"
                          style={{ marginLeft: 10 }}
                          onClick={() => this.resetSettings(true)}
                        >
                          {lang_submissions.reset}
                        </button>
                        <Link to="/submissions/new">
                          <button
                            className="btn btn-success"
                            style={{ marginLeft: 10 }}
                          >
                            {lang_submissions.create}
                          </button>
                        </Link>
                      </React.Fragment>
                    }
                  />
                </div>
              )
            }}
          />
        ) : (
          <p>{lang_submissions.loading}</p>
        )}
      </div>
    );
  }
}

export default Submissions;
