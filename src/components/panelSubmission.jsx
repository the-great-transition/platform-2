import React, { Component } from "react";
import Comments from "./comments";
import TextDisplay from "../common/textDisplay";
import { toHTML } from "../utilities/string";
import { submission as lang_submission } from "../language/fr";
import Participant from "./participant";

class PanelSubmission extends Component {
  handleChange = e => {
    return null;
  };

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-7">
            <h4>{toHTML(data.subm_title)}</h4>
            <div className="row">
              <div className="col-6">
                <TextDisplay
                  name="language"
                  label={lang_submission.language.label}
                  value={lang_submission.language.lookup[data.subm_language]}
                />
                <TextDisplay
                  name="orientation"
                  label={lang_submission.orientation.label}
                  value={
                    lang_submission.orientation.lookup[data.subm_orientation]
                  }
                />
              </div>
              <div className="col-6">
                <TextDisplay
                  name="theme"
                  label={lang_submission.theme.label}
                  value={lang_submission.theme.lookup[data.subm_theme]}
                />
                {data.subm_type !== "1" ? (
                  <TextDisplay
                    name="level"
                    label={lang_submission.level.label}
                    value={lang_submission.level.lookup[data.subm_level]}
                  />
                ) : (
                  <TextDisplay
                    name="level"
                    label={lang_submission.commsnum}
                    value={data.comms.length}
                  />
                )}
              </div>
            </div>
            <TextDisplay
              name="description"
              label={lang_submission.description}
              value={toHTML(data.subm_description)}
            />
            {data.chair ? (
              <TextDisplay
                name="chair"
                label={lang_submission.chair}
                value={toHTML(
                  data.chair.part_fname + " " + data.chair.part_lname
                )}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-5">
            <Comments user={this.props.user} subm_id={data.subm_id} />
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            {data.parts.map((p, k) => {
              return (
                <div>
                  <h4>
                    {lang_submission.part} #{k + 1}
                  </h4>
                  <Participant key={k} data={p} />
                </div>
              );
            })}
          </div>
          <div className="col-5"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default PanelSubmission;
