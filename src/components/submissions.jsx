import React, { Component } from "react";
import MaterialTable from "material-table";
import Helmet from "react-helmet";
import { getResource } from "../services/resourceService";
import { toHTML, shorten } from "./../utilities/string";
import {
  materialTable as lang_table,
  submissions as lang_submissions
} from "../language/fr";

class Submissions extends Component {
  state = {
    submissions: {},
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

  render() {
    const { submissions } = this.state;
    let data = [];
    if (submissions && submissions.length >= 0) {
      data = submissions.map((d, i) => {
        const r = {
          id: d.subm_id,
          slug: d.subm_slug,
          submittedby: toHTML(d.user_name),
          title: toHTML(d.subm_title),
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
                <h5>
                  {lang_submissions.description} : {rowData.title}
                </h5>
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
        />
      </div>
    );
  }
}

export default Submissions;
