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
  panelists as lang_panelists
} from "../language/fr";

class Panelists extends Component {
  state = {
    panelists: {},
    panelistsStatus: "0",
    selectedRow: null
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    if (!localStorage.getItem("panelistsSettings")) {
      this.resetSettings(false);
    }
  }

  componentDidMount() {
    if (localStorage.getItem("panelistsSettings")) {
      const settings = JSON.parse(localStorage.getItem("panelistsSettings"));
      this.setState({ panelistsStatus: settings.panelistsStatus });
    }
    this.populate();
  }

  componentDidUpdate() {
    let settings = JSON.parse(localStorage.getItem("panelistsSettings"));
    settings.panelistsStatus = this.state.panelistsStatus;
    localStorage.setItem("panelistsSettings", JSON.stringify(settings));
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
      panelistsStatus: this.state.panelistsStatus,
      initialPage: state.currentPage,
      pageSize: state.pageSize,
      orderBy: state.orderBy,
      orderDirection: state.orderDirection,
      filtering: filtering
    };
    localStorage.setItem("panelistsSettings", JSON.stringify(settings));
  }

  resetSettings = reload => {
    const settings = {
      panelistsStatus: "0",
      initialPage: 0,
      pageSize: 10,
      orderBy: -1,
      orderDirection: "",
      filtering: {}
    };
    localStorage.setItem("panelistsSettings", JSON.stringify(settings));
    if (reload) {
      window.location = "/panelists";
    }
  };

  async populate() {
    const panelists = await getResource("part");
    this.setState({ panelists });
  }

  handleSelect = e => {
    const { value: panelistsStatus } = e.currentTarget;
    this.setState({ panelistsStatus });
  };

  render() {
    const { panelists } = this.state;
    const settings = JSON.parse(localStorage.getItem("panelistsSettings"));
    const columns = lang_panelists.columns.map((c, k) => {
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
    if (panelists && panelists.length >= 0) {
      unfiltered = panelists.map((d, i) => {
        const r = {
          id: d.part_id,
          slug: d.part_slug,
          fname: toHTML(d.part_fname),
          lname: toHTML(d.part_lname),
          fullname: d.part_fname + " " + d.part_lname,
          pronouns: toHTML(d.part_pronouns),
          email: toHTML(d.part_email),
          photo: d.part_photo,
          affiliation: toHTML(d.part_affiliation),
          bio: toHTML(d.part_bio),
          city: toHTML(d.part_city),
          country: toHTML(d.part_country),
          gender: toHTML(d.part_gender),
          minority: toHTML(d.part_minority),
          status: d.part_status,
          user: d.user_id,
          subm: d.subm_id
        };
        return r;
      });
    }
    let data = unfiltered.filter(d => {
      return d.status === this.state.panelistsStatus;
    });
    return (
      <div>
        <Helmet>
          <title>{lang_panelists.title}</title>
        </Helmet>
        {panelists && panelists.length >= 0 ? (
          <MaterialTable
            tableRef={this.tableRef}
            title={lang_panelists.title}
            localization={lang_table}
            columns={columns}
            data={data}
            detailPanel={rowData => {
              return (
                <div style={{ padding: 20 }}>
                  <h5>{rowData.fullname}</h5>
                  {shorten(rowData.bio, 1000)}
                </div>
              );
            }}
            actions={[
              {
                icon: "listalt",
                tooltip: lang_panelists.view,
                onClick: (event, rowData) => {
                  this.updateSettings();
                  this.props.history.push({
                    tableArray: this.tableRef.current.state.data,
                    tableIndex: rowData.id,
                    pathname: "/panelists/" + rowData.id + "-" + rowData.slug
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
                          name="submissionsType"
                          array={lang_panelists.status}
                          selected={this.state.panelistsStatus}
                          onSelect={this.handleSelect}
                        />
                        <button
                          className="btn btn-warning"
                          style={{ marginLeft: 10 }}
                          onClick={() => this.resetSettings(true)}
                        >
                          {lang_panelists.reset}
                        </button>
                        <Link to="/panelists/new">
                          <button
                            className="btn btn-success"
                            style={{ marginLeft: 10 }}
                          >
                            {lang_panelists.create}
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
          <p>{lang_panelists.loading}</p>
        )}
      </div>
    );
  }
}

export default Panelists;
