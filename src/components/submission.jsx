import React, { Component } from "react";
import Helmet from "react-helmet";
import Comments from "./comments";
import Participant from "./participant";
import PanelSubmission from "./panelSubmission";
import TextDisplay from "../common/textDisplay";
import ButtonGroup from "../common/buttonGroup";
import SelectInput from "../common/selectInput";
import { toHTML } from "../utilities/string";
import {
  submission as lang_submission,
  submissionCreate as lang_submissionCreate
} from "../language/fr";

class Submission extends Component {
  componentDidMount() {
    this.props.getRatings(this.props.data.subm_id);
    this.props.getComments(this.props.data.subm_id);
    if (this.props.location.tableArray) {
      const { location } = this.props;
      this.props.onNavDisable(location.tableArray, location.tableIndex);
    }
  }

  handleNav = e => {
    const { value } = e.currentTarget;
    const { location } = this.props;
    const limits = this.props.onNavDisable(
      location.tableArray,
      location.tableIndex
    );
    const goTo = limits[value];
    if (goTo) {
      const { tableArray } = location;
      const index = tableArray.findIndex(a => a.id === goTo);
      this.props.onNavDisable(tableArray, tableArray[index].id);
      this.props.onNav({
        tableArray: tableArray,
        tableIndex: tableArray[index].id,
        pathname:
          "/submissions/" + tableArray[index].id + "-" + tableArray[index].slug
      });
    }
  };

  render() {
    const {
      data,
      ratings,
      navigationDisabled,
      user,
      onNavEscape,
      onModify,
      onRating,
      onStatus,
      comments,
      myComment,
      onChangeComment,
      onSubmitComment,
      onDeleteComment
    } = this.props;
    const navigationHide =
      navigationDisabled.previous && navigationDisabled.next ? true : false;
    return (
      <React.Fragment>
        <Helmet>
          <title>{toHTML(data.subm_title)}</title>
        </Helmet>
        <div className="row">
          <div className="col-8">
            <h3>
              {lang_submission.type.lookup[data.subm_type] +
                " #" +
                data.subm_id +
                " " +
                lang_submission.by +
                " " +
                data.user_name}
            </h3>
            <h5>
              <i>{lang_submission.submittedon + data.subm_time}</i>
            </h5>
          </div>
          <div className="col-4 my-auto" align="right">
            <div className="btn-group">
              <button
                className="btn btn-dark"
                value="previous"
                disabled={navigationDisabled.previous}
                hidden={navigationHide}
                style={{
                  width: "7em"
                }}
                onClick={this.handleNav}
              >
                {lang_submission.previous}
              </button>

              <button
                className="btn btn-dark"
                value="next"
                disabled={navigationDisabled.next}
                hidden={navigationHide}
                style={{ width: "7em", marginLeft: 5, marginRight: 5 }}
                onClick={this.handleNav}
              >
                {lang_submission.next}
              </button>
              <button
                className="btn btn-dark"
                value="escape"
                style={{ width: "3em" }}
                onClick={onNavEscape}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
            <label htmlFor="myRating">
              <b>{lang_submission.myRating}</b>
            </label>
            <ButtonGroup
              id={data.subm_id}
              name="myRating"
              array={[
                { label: 1, value: "1" },
                { label: 2, value: "2" },
                { label: 3, value: "3" },
                { label: 4, value: "4" },
                { label: 5, value: "5" }
              ]}
              selected={ratings.myRating}
              onSelect={onRating}
            />
            {lang_submission.averageRating}
            <b>{ratings.average}</b>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-7">
            <h4>{toHTML(data.subm_title)}</h4>
            {user.role <= 1 ? (
              <button
                className="btn btn-dark mb-3"
                value="modify"
                onClick={onModify}
              >
                {lang_submission.modify}
              </button>
            ) : (
              ""
            )}
            <SelectInput
              name="status"
              label={lang_submissionCreate.statusLabel}
              value={lang_submissionCreate.status[data.subm_status]}
              options={lang_submissionCreate.status}
              onChange={onStatus}
            />
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
            <TextDisplay
              name="information"
              label={lang_submission.information}
              value={toHTML(data.subm_info)}
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
            <Comments
              user={user}
              subm_id={data.subm_id}
              comments={comments}
              myComment={myComment}
              onChangeComment={onChangeComment}
              onSubmitComment={onSubmitComment}
              onDeleteComment={onDeleteComment}
            />
          </div>
        </div>
        {data.subm_type !== "1" ? (
          <div className="row mt-3">
            <div className="col-7">
              {data.parts.map((p, k) => {
                return (
                  <div key={k}>
                    <h4>
                      {lang_submission.part} #{k + 1}
                    </h4>
                    <Participant data={p} />
                  </div>
                );
              })}
            </div>
            <div className="col-5"></div>
          </div>
        ) : (
          data.comms.map((c, k) => {
            return (
              <div className="mt-3" key={k}>
                <h4>
                  {lang_submission.comm} #{k + 1}
                </h4>
                <PanelSubmission data={c} />
              </div>
            );
          })
        )}
      </React.Fragment>
    );
  }
}

export default Submission;
