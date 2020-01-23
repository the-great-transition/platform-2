import React, { Component } from "react";
import ButtonGroup from "../common/buttonGroup";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { confirm as lang_confirm } from "../language/fr";
import header0 from "../media/site-header-v1-fr.jpg";
import header1 from "../media/site-header-v1-eng.jpg";

class Confirm extends Component {
  state = {
    partID: null,
    language: null,
    confirmations: {},
    answers: {}
  };

  componentDidMount() {
    this.getConfirmations(this.props.location.pathname);
  }

  async getConfirmations(pathname) {
    const splitPath = pathname.split("/");
    const splitSlug = splitPath[2].split("-");
    const partID = splitSlug[0];
    const language = splitSlug[1];
    const confirmations = await getResource("confirmation", partID);
    if (confirmations === null) {
    } else {
      this.setState({ partID, confirmations, language });
    }
  }

  async postConfirmation(input) {
    const data = {
      id: this.state.partID,
      subm_id: input.name,
      confirmation: input.value
    };
    try {
      await postResource("confirmation", data);
      this.getConfirmations(this.props.location.pathname);
    } catch (ex) {
      console.log(ex);
    }
  }

  handleSelect = e => {
    this.postConfirmation(e.currentTarget);
  };

  render() {
    const { confirmations, language } = this.state;
    let imagelang = header0;
    if (language) {
      if (parseInt(language) === 0) {
        imagelang = header0;
      } else if (parseInt(language) === 1) {
        imagelang = header1;
      }
    }
    return (
      <div className="container border pt-5 px-0 bg-white">
        <div className="row pb-5">
          <div className="col-2"></div>
          <div className="col-8">
            {language ? (
              <img
                src={imagelang}
                width="578"
                style={{ display: "block", margin: "auto" }}
                alt={lang_confirm[language].imagealt}
              />
            ) : (
              ""
            )}
            {confirmations.length > 0 ? (
              <React.Fragment>
                <h4>{lang_confirm[language].indicate}</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>{lang_confirm[language].title}</th>
                      <th>{lang_confirm[language].answer}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmations.map((c, k) => {
                      return (
                        <tr key={k}>
                          <td>{toHTML(c.subm_title)}</td>
                          <td>
                            <ButtonGroup
                              name={c.subm_id}
                              array={lang_confirm[language].answers}
                              selected={parseInt(c.part_subm_confirmation)}
                              onSelect={this.handleSelect}
                              style={{
                                width: "6em"
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default Confirm;
