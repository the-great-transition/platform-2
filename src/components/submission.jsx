import React, { Component } from "react";
import Helmet from "react-helmet";
import TextDisplay from "../common/textDisplay";
import ButtonGroup from "../common/buttonGroup";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "../utilities/string";
import { submission as lang_submission } from "../language/fr";

class Submission extends Component {
  state = {
    ratings: { average: 0, myRating: null }
  };

  componentDidMount() {
    this.getRatings();
    if (this.props.location.tableArray) {
      const { location } = this.props;
      this.props.onNavDisable(location.tableArray, location.tableIndex);
    }
  }

  treatRatings(ratings) {
    ratings["average"] = Math.ceil(ratings["average"] * 100) / 100;
    this.setState({ ratings });
  }

  async getRatings() {
    const ratings = await getResource("rating", this.props.data.subm_id);
    this.treatRatings(ratings);
  }

  async postRating() {
    const data = {
      id: this.props.data.subm_id,
      rating: this.state.ratings.myRating
    };
    const ratings = await postResource("rating", data);
    this.treatRatings(ratings);
  }

  handleChange = e => {
    return null;
  };

  handleRating = ({ currentTarget: input }) => {
    const { value } = input;
    const oldvalue = this.state.ratings.myRating;
    const { ratings } = this.state;
    ratings.myRating = ratings.myRating === value ? 0 : value;
    this.setState({ ratings }, () => {
      try {
        this.postRating();
      } catch (ex) {
        ratings["myRating"] = oldvalue;
        this.setState({ ratings });
      }
    });
  };

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
    const { data } = this.props;
    const { navigationDisabled } = this.props;
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
                value="escape"
                style={{ width: "5em", marginLeft: 5, marginRight: 5 }}
                onClick={this.props.onNavEscape}
              >
                {lang_submission.escape}
              </button>
              <button
                className="btn btn-dark"
                value="next"
                disabled={navigationDisabled.next}
                hidden={navigationHide}
                style={{ width: "7em" }}
                onClick={this.handleNav}
              >
                {lang_submission.next}
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
              name="myRating"
              array={[
                { label: 1, value: 1 },
                { label: 2, value: 2 },
                { label: 3, value: 3 },
                { label: 4, value: 4 },
                { label: 5, value: 5 }
              ]}
              selected={this.state.ratings.myRating}
              onRating={this.handleRating}
            />
            {lang_submission.averageRating}
            <b>{this.state.ratings.average}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <div className="row">
              <div className="col">
                <h4>{toHTML(data.subm_title)}</h4>
                <div className="row">
                  <div className="col-6">
                    <TextDisplay
                      name="language"
                      label={lang_submission.language.label}
                      value={
                        lang_submission.language.lookup[data.subm_language]
                      }
                    />
                    <TextDisplay
                      name="orientation"
                      label={lang_submission.orientation.label}
                      value={
                        lang_submission.orientation.lookup[
                          data.subm_orientation
                        ]
                      }
                    />
                  </div>
                  <div className="col-6">
                    <TextDisplay
                      name="theme"
                      label={lang_submission.theme.label}
                      value={lang_submission.theme.lookup[data.subm_theme]}
                    />
                    <TextDisplay
                      name="level"
                      label={lang_submission.level.label}
                      value={lang_submission.level.lookup[data.subm_level]}
                    />
                  </div>
                </div>
                <TextDisplay
                  name="description"
                  label={lang_submission.description}
                  value={toHTML(data.subm_description)}
                />
              </div>
            </div>
            <div className="row"></div>
          </div>
          <div className="col-5">
            <div className="row">
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Submission;
