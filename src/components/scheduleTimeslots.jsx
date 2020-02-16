import React, { Component } from "react";
import Helmet from "react-helmet";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import Input from "../common/input";
import {
  getResource,
  postResource,
  deleteResource
} from "../services/resourceService";
import {
  schedule as lang_schedule,
  moment_locale as locale
} from "../language/fr";

var moment = require("moment");
moment.fn.round5 = function() {
  var intervals = Math.floor(this.minutes() / 5);
  if (this.minutes() % 5 !== 0) intervals++;
  if (intervals === 12) {
    this.add("hours", 1);
    intervals = 0;
  }
  this.minutes(intervals * 5);
  this.seconds(0);
  return this;
};
moment.locale("fr", locale);
var _ = require("lodash");

class ScheduleTimeslots extends Component {
  state = {
    timeslots: {},
    insert: {
      id: null,
      date: "2020-01-01",
      begin: moment().round5(),
      end: moment()
        .add(1, "h")
        .round5()
    },
    emptyInsert: {
      id: null,
      date: "2020-01-01",
      begin: moment().round5(),
      end: moment()
        .add(1, "h")
        .round5()
    },
    newmodify: "new"
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const timeslots = await getResource("time");
    this.setState({ timeslots });
  }

  handleTimeDateChange = e => {
    const { value } = e.currentTarget;
    const { insert } = this.state;
    insert.date = value;
    this.setState({ insert });
  };

  handleTimeBeginChange = e => {
    const { insert } = this.state;
    if (insert.end < e) {
      const newEnd = moment(e).add(5, "m");
      insert.end = newEnd;
    }
    insert.begin = e;
    this.setState({ insert });
  };

  handleTimeEndChange = e => {
    const { insert } = this.state;
    if (e > insert.begin) {
      insert.end = e;
    } else {
      const newEnd = moment(insert.begin).add(5, "m");
      insert.end = newEnd;
    }
    this.setState({ insert });
  };

  editTime = e => {
    const insert = {
      id: e.time_id,
      date: e.time_date,
      begin: moment("2020-01-01 " + e.time_begin),
      end: moment("2020-01-01 " + e.time_end)
    };
    this.setState({ insert, newmodify: "modify" });
  };

  async deleteTime(id) {
    try {
      await deleteResource("time", id);
      this.populate();
    } catch (ex) {
      console.log(ex);
    }
  }

  handleCancel = () => {
    const { emptyInsert } = this.state;
    this.setState({ insert: emptyInsert, newmodify: "new" });
  };

  handleSubmit = async () => {
    const { id, date, begin, end } = this.state.insert;
    const data = {
      time_date: date,
      time_begin: begin.format("HH:mm"),
      time_end: end.format("HH:mm")
    };
    try {
      const string = id === null ? "time" : "time/" + id;
      await postResource(string, data);
      this.populate();
      this.handleCancel();
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { timeslots, newmodify } = this.state;
    const { id, date, begin, end } = this.state.insert;
    let dates = {};
    if (timeslots && timeslots.length > 0) {
      dates = _.uniqWith(timeslots, function(arrVal, othVal) {
        return arrVal.time_date === othVal.time_date;
      });
    }
    dates = _.orderBy(dates, ["time_date"]);
    const timeslotsdays_unsorted = dates.map((d, k) => {
      return timeslots.filter(t => {
        return t.time_date === d.time_date;
      });
    });
    const timeslotsdays = timeslotsdays_unsorted.map((d, k) => {
      return _.orderBy(d, ["time_begin", "time_end"]);
    });
    return (
      <div>
        <Helmet>
          <title>{lang_schedule.timeslots_helmet}</title>
        </Helmet>
        <div className="row">
          <div className="col-3 border  bg-light">
            {newmodify === "new" ? (
              <h4 className="my-3">{lang_schedule.timeslot_new}</h4>
            ) : (
              <h4 className="my-3">{lang_schedule.timeslot_modify}</h4>
            )}
            <Input
              type="date"
              name="date"
              value={date}
              label={lang_schedule.timeslot_date}
              onChange={this.handleTimeDateChange}
            />
            <div className="form-group">
              <label htmlFor="begin" className="mr-2">
                {lang_schedule.timeslot_begin}
              </label>
              <TimePicker
                name="begin"
                value={begin}
                showSecond={false}
                minuteStep={5}
                onChange={this.handleTimeBeginChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end" className="mr-2">
                {lang_schedule.timeslot_end}
              </label>
              <TimePicker
                name="end"
                value={end}
                showSecond={false}
                minuteStep={5}
                onChange={this.handleTimeEndChange}
              />
            </div>
            <button
              className="btn btn-block btn-success mb-2"
              onClick={this.handleSubmit}
            >
              {lang_schedule.submit}
            </button>
            {newmodify === "modify" ? (
              <button
                className="btn btn-block btn-warning mb-3"
                onClick={this.handleCancel}
              >
                {lang_schedule.cancel}
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="col-9 border">
            <h2 className="my-2">{lang_schedule.timeslots_header}</h2>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th width="45%">{lang_schedule.timeslots_date}</th>
                  <th width="15%">{lang_schedule.timeslots_begin}</th>
                  <th width="15%">{lang_schedule.timeslots_end}</th>
                  <th width="25%"></th>
                </tr>
              </thead>
              <tbody>
                {timeslotsdays && timeslotsdays.length > 0
                  ? timeslotsdays.map((d, key) => {
                      const date = moment(d[0].time_date).format(
                        "dddd, Do MMMM YYYY"
                      );
                      return (
                        <React.Fragment key={key}>
                          <tr>
                            <th className="bg-light" colSpan="4">
                              {date}
                            </th>
                          </tr>
                          {d.map((t, k) => {
                            const begin = moment(
                              "2020-01-01 " + t.time_begin
                            ).format("HH:mm");
                            const end = moment(
                              "2020-01-01 " + t.time_end
                            ).format("HH:mm");
                            return (
                              <tr
                                key={k}
                                className={
                                  id === t.time_id
                                    ? "text-primary font-weight-bold bg-light"
                                    : ""
                                }
                              >
                                <td></td>
                                <td>{begin}</td>
                                <td>{end}</td>
                                <td align="center">
                                  <button
                                    className="btn btn-warning"
                                    style={{ width: "6em" }}
                                    onClick={() => this.editTime(t)}
                                  >
                                    {lang_schedule.modify}
                                  </button>
                                  <button
                                    className="btn btn-danger ml-3"
                                    style={{ width: "6em" }}
                                    onClick={() => this.deleteTime(t.time_id)}
                                  >
                                    {lang_schedule.delete}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleTimeslots;
