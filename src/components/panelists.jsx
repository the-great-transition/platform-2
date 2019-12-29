import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { getResource } from "../services/resourceService";
import { toHTML, shorten } from "./../utilities/string";
import {
  materialTable as lang_table,
  panelists as lang_panelists
} from "../language/fr";
import ButtonGroup from "../common/buttonGroup";

class Panelists extends Component {
  state = {
    panelists: {},
    panelistsStatus: "0",
    selectedRow: null
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  componentDidMount() {
    this.populate();
  }

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
        <MaterialTable
          tableRef={this.tableRef}
          title={lang_panelists.title}
          localization={lang_table}
          columns={lang_panelists.columns}
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
            pageSize: 10,
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
      </div>
    );
  }
}

export default Panelists;
