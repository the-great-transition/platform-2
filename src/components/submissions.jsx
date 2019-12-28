import React, { Component } from "react";
import Helmet from "react-helmet";
import MaterialTable from "material-table";
import { MTableToolbar } from "material-table";
import { getResource } from "../services/resourceService";
import { toHTML, shorten } from "./../utilities/string";
import {
  materialTable as lang_table,
  submissions as lang_submissions
} from "../language/fr";
import ButtonGroup from "../common/buttonGroup";

class Submissions extends Component {
  state = {
    submissions: {},
    submissionsType: "0",
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
    const submissions = await getResource("subm");
    this.setState({ submissions });
  }

  handleSelect = e => {
    console.log("yes");
    const { value: submissionsType } = e.currentTarget;
    this.setState({ submissionsType });
  };

  render() {
    const { submissions } = this.state;
    let unfiltered = [];
    if (submissions && submissions.length >= 0) {
      unfiltered = submissions.map((d, i) => {
        const r = {
          id: d.subm_id,
          average: d.average,
          slug: d.subm_slug,
          submittedby: toHTML(d.user_name),
          title: "#" + d.subm_id + " " + toHTML(d.subm_title),
          description: toHTML(d.subm_description),
          language: d.subm_language,
          level: d.subm_level,
          theme: d.subm_theme,
          orientation: d.subm_orientation,
          type: d.subm_type,
          status: d.subm_status
        };
        return r;
      });
    }
    let data = unfiltered.filter(d => {
      return d.status === this.state.submissionsType;
    });
    return (
      <div>
        <Helmet>
          <title>{lang_submissions.title}</title>
        </Helmet>
        <MaterialTable
          tableRef={this.tableRef}
          title={lang_submissions.title}
          localization={lang_table}
          columns={lang_submissions.columns}
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
              tooltip: lang_submissions.modify,
              onClick: (event, rowData) => {
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
            pageSize: 10,
            pageSizeOptions: [5, 10, 20, 50, 100]
          }}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar
                  {...props}
                  title={
                    <ButtonGroup
                      name="submissionsType"
                      array={lang_submissions.type}
                      selected={this.state.submissionsType}
                      onSelect={this.handleSelect}
                    />
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

export default Submissions;
