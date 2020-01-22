import React, { Component } from "react";
import { getResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { submissions as lang_submissions } from "./../language/fr";

class ExportEmails extends Component {
  state = {
    submissions: {}
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const submissions = await getResource("subm", false, "status=2");
    this.setState({ submissions });
  }

  render() {
    const { submissions } = this.state;
    let panelists = [];
    if (submissions && submissions.length >= 0) {
      submissions.forEach(s => {
        let details = s.subm_title;
        if (parseInt(s.subm_type) === 1) {
          s.comms.forEach(c => {
            let r = "- " + c.subm_title + " | ";
            c.parts.forEach(p => {
              r +=
                p.part_fname +
                " " +
                p.part_lname +
                (p.part_email !== s.user_email
                  ? " (" + p.part_email + ")"
                  : "") +
                ", ";
            });
            r = r.slice(0, r.length - 2);
            details += "[RETURN]" + r;
          });
        } else if (parseInt(s.subm_type) === 2) {
          details += "[RETURN]";
          s.parts.forEach(p => {
            details +=
              p.part_fname +
              " " +
              p.part_lname +
              (p.part_email !== s.user_email ? " (" + p.part_email + ")" : "") +
              ", ";
          });
          details = details.slice(0, details.length - 2);
        }
        if (s.chair) {
          details += "[CHAIR]" + s.chair.part_fname + " " + s.chair.part_lname;
        }
        if (parseInt(s.subm_type) === 1) {
          s.comms.forEach(c => {
            c.parts.forEach(p => {
              const r = {
                partID: p.part_id,
                partUserID: p.user_id,
                partEmail: p.part_email,
                partFname: toHTML(p.part_fname),
                partLname: toHTML(p.part_lname),
                userID: c.user_id,
                userEmail: c.user_email,
                userName: toHTML(c.user_name),
                submID: s.subm_id,
                submTitle: toHTML(s.subm_title),
                submType: s.subm_type,
                commID: c.subm_id,
                commTitle: toHTML(c.subm_title),
                language: c.subm_language,
                details: toHTML(details)
              };
              panelists.push(r);
            });
          });
        } else if (parseInt(s.subm_type) === 2) {
          s.parts.forEach(p => {
            const r = {
              partID: p.part_id,
              partUserID: p.user_id,
              partEmail: p.part_email,
              partFname: toHTML(p.part_fname),
              partLname: toHTML(p.part_lname),
              userID: s.user_id,
              userEmail: s.user_email,
              userName: toHTML(s.user_name),
              submID: s.subm_id,
              submTitle: toHTML(s.subm_title),
              submType: s.subm_type,
              commTitle: null,
              language: s.subm_language,
              details: toHTML(details)
            };
            panelists.push(r);
          });
        }
      });
    }
    console.log(panelists);
    return (
      <React.Fragment>
        {submissions && submissions.length >= 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>language</th>
                <th>partID</th>
                <th>partUserID</th>
                <th>partEmail</th>
                <th>partFname</th>
                <th>partLname</th>
                <th>userID</th>
                <th>userEmail</th>
                <th>userName</th>
                <th>submID</th>
                <th>submTitle</th>
                <th>submType</th>
                <th>commTitle</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>
              {panelists.map((p, k) => {
                return (
                  <tr key={k}>
                    <td>{p.language}</td>
                    <td>{p.partID}</td>
                    <td>{p.partUserID}</td>
                    <td>{p.partEmail}</td>
                    <td>{p.partFname}</td>
                    <td>{p.partLname}</td>
                    <td>{p.userID}</td>
                    <td>{p.userEmail}</td>
                    <td>{p.userName}</td>
                    <td>{p.submID}</td>
                    <td>{p.submTitle}</td>
                    <td>{p.submType}</td>
                    <td>{p.commTitle}</td>
                    <td>{p.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>{lang_submissions.loading}</p>
        )}
      </React.Fragment>
    );
  }
}

export default ExportEmails;
