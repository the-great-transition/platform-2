import React, { Component } from "react";
import TextDisplay from "../common/textDisplay";
import { toHTML } from "./../utilities/string";
import { part as lang_part } from "../language/fr";

class Participant extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            <TextDisplay
              name="description"
              label={lang_part.fname}
              value={toHTML(data.part_fname)}
            />
            <TextDisplay
              name="description"
              label={lang_part.city}
              value={toHTML(data.part_city)}
            />
            <TextDisplay
              name="description"
              label={lang_part.email}
              value={toHTML(data.part_email)}
            />
            <TextDisplay
              name="description"
              label={lang_part.affiliation}
              value={toHTML(data.part_affiliation)}
            />
          </div>
          <div className="col-6">
            <TextDisplay
              name="description"
              label={lang_part.lname}
              value={toHTML(data.part_lname)}
            />

            <TextDisplay
              name="description"
              label={lang_part.country}
              value={toHTML(data.part_country)}
            />
            <TextDisplay
              name="description"
              label={lang_part.gender}
              value={toHTML(data.part_gender)}
            />
            <TextDisplay
              name="description"
              label={lang_part.minority}
              value={toHTML(data.part_minority)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <TextDisplay
              name="description"
              label={lang_part.bio}
              value={toHTML(data.part_bio)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Participant;
