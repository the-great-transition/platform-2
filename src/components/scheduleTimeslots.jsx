import React, { Component } from "react";
import Helmet from "react-helmet";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import SelectInput from "./../common/selectInput";
import { getResource, postResource } from "../services/resourceService";
import { toHTML } from "./../utilities/string";
import { schedule as lang_schedule } from "../language/fr";

class ScheduleTimeslots extends Component {
  state = {
    timeslots: {},
    selectedTimeslot: {},
    emptyTimeslot: {
      begin: ""
    }
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const timeslots = await getResource("time");
    this.setState({ timeslots });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{lang_schedule.timeslots_helmet}</title>
        </Helmet>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <label htmlFor="timeslot_begin" className="mr-2">
                {lang_schedule.timeslot_begin}
              </label>
              <TimePicker
                name="timeslot_begin"
                showSecond={false}
                minuteStep={5}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeslot_end" className="mr-2">
                {lang_schedule.timeslot_end}
              </label>
              <TimePicker
                name="timeslot_end"
                showSecond={false}
                minuteStep={5}
              />
            </div>
          </div>
          <div className="col-8"></div>
        </div>
      </div>
    );
  }
}

export default ScheduleTimeslots;
