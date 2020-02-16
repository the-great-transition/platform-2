import React, { Component } from "react";
import Helmet from "react-helmet";
import SelectInput from "../common/selectInput";
import Checkbox from "../common/checkboxInput";
import {
  getResource,
  postResource,
  deleteResource
} from "../services/resourceService";
import { toHTML, shorten } from "./../utilities/string";
import { schedule as lang_schedule } from "../language/fr";
import { register } from "./../serviceWorker";

var moment = require("moment");
var _ = require("lodash");

function formatHour(date, hour) {
  const r = moment(date + " " + hour);
  return r.format("HH:mm");
}

class ScheduleRoomsTimeslots extends Component {
  state = {
    times: {},
    rooms: {},
    timeslots: {},
    submissions: {},
    insert: {
      room: null,
      time: []
    },
    emptyInsert: {
      room: null,
      time: []
    },
    selectedDate: null,
    selectedTimeslot: null,
    selectedSubm: null
  };

  componentDidMount() {
    this.populate();
    this.populateSubm();
  }

  async populate() {
    const timesUnsorted = await getResource("time");
    const rooms = await getResource("room");
    const slots = await getResource("timeslot");
    const times = _.orderBy(timesUnsorted, [
      "time_date",
      "time_begin",
      "time_end"
    ]);
    let dates = {};
    dates = _.uniqWith(times, function(arrVal, othVal) {
      return arrVal.time_date === othVal.time_date;
    });
    const timeslots = dates.map((d, k) => {
      const filterUnsorted = slots.filter(s => {
        return s.time_date === d.time_date;
      });
      const filter = _.orderBy(filterUnsorted, ["time_begin", "time_end"]);
      const r = {
        date: d.time_date,
        slots: filter
      };
      return r;
    });
    this.setState({ times, rooms, timeslots });
  }

  async populateSubm() {
    const submissions = await getResource("subm");
    this.setState({ submissions });
  }

  handleChange = e => {
    const { name, value, type } = e.currentTarget;
    const insert = { ...this.state.insert };
    insert[name] = type === "number" ? Math.round(value) : value;
    this.setState({ insert });
  };

  handleSelectChange = e => {
    const { insert, timeslots } = this.state;
    const nam = e.name;
    const val = e;
    if (nam === "room") {
      insert.room = val;
      let time = [];
      let array = [];
      timeslots.forEach(t => {
        array = array.concat(t.slots);
      });
      array.forEach(a => {
        if (parseInt(a.room_id) === parseInt(val.value)) {
          time.push(parseInt(a.time_id));
        }
      });
      insert.time = time;
      this.setState({ insert });
    } else if (nam === "date") {
      this.setState({ selectedDate: val });
    } else if (nam === "subm") {
      this.setState({ selectedSubm: val });
    }
  };

  handleChangeChk = e => {
    const { value } = e.currentTarget;
    const { insert } = this.state;
    const index = insert.time.indexOf(parseInt(value));
    if (index === -1) {
      insert.time.push(parseInt(value));
    } else {
      insert.time.splice(index, 1);
    }
    this.setState({ insert });
  };

  handleCheckAll = a => {
    const { times, insert } = this.state;
    let all = [];
    times.forEach(t => {
      all.push(parseInt(t.time_id));
    });
    insert.time = all;
    this.setState({ insert });
  };

  handleUncheckAll = () => {
    const { insert } = this.state;
    insert.time = [];
    this.setState({ insert });
  };

  handleCancel = () => {
    const { emptyInsert } = this.state;
    this.setState({ insert: emptyInsert });
  };

  handleCancelSubm = () => {
    this.setState({ selectedSubm: null });
  };

  handleSelectTimeslot = selectedTimeslot => {
    if (selectedTimeslot === this.state.selectedTimeslot) {
      this.setState({ selectedTimeslot: null });
    } else {
      this.setState({ selectedTimeslot });
    }
  };

  handleSubmit = async () => {
    const { room, time } = this.state.insert;
    const data = { time };
    try {
      const string = "timeslot/" + room.value;
      await postResource(string, data);
      this.populate();
    } catch (ex) {
      console.log(ex);
    }
  };

  handleSubmitSubm = async () => {
    const { selectedTimeslot, selectedSubm } = this.state;
    const data = {
      time: selectedTimeslot.time_id,
      subm: selectedSubm.value
    };
    try {
      const string = "timeslot/" + selectedTimeslot.room_id;
      await postResource(string, data);
      this.populate();
      this.setState({ selectedSubm: null });
    } catch (ex) {
      console.log(ex);
    }
  };

  async deleteTimeslot(id, time) {
    try {
      await deleteResource("room_time", id, time);
      this.populate();
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const {
      times,
      rooms,
      timeslots,
      submissions,
      selectedDate,
      selectedTimeslot,
      selectedSubm
    } = this.state;
    const { room, time } = this.state.insert;
    const roomsSorted =
      rooms && rooms.length > 0
        ? _.orderBy(rooms, ["room_location"], ["asc"])
        : null;
    const roomOptions = roomsSorted
      ? roomsSorted.map((r, k) => {
          const ret = {
            key: k,
            name: "room",
            value: r.room_id,
            label: r.room_location + " (" + r.room_capacity + ")"
          };
          return ret;
        })
      : null;
    const timesSorted =
      times && times.length > 0
        ? _.orderBy(times, ["time_date", "time_begin", "time_end"])
        : null;
    const timeOptions =
      room && timesSorted
        ? timesSorted.map((t, k) => {
            const begin = moment(t.time_date + " " + t.time_begin);
            const end = moment(t.time_date + " " + t.time_end);
            let ret = {
              key: k,
              name: "time",
              value: t.time_id,
              label:
                begin.format("YYYY-MM-DD HH:mm") +
                lang_schedule.fromto +
                end.format("HH:mm")
            };
            ret.checked = time.includes(parseInt(t.time_id)) ? true : false;
            return ret;
          })
        : null;
    const dateOptions =
      timeslots && timeslots.length > 0
        ? timeslots.map((t, k) => {
            const date = moment(t.date);
            const r = {
              name: "date",
              value: k,
              date: t.date,
              label: date.format("dddd, Do MMMM YYYY")
            };
            return r;
          })
        : null;
    let displayCols = selectedDate
      ? times.map((t, k) => {
          let col = null;
          if (t.time_date === selectedDate.date) {
            col = {
              id: t.time_id,
              begin: moment(t.time_date + " " + t.time_begin),
              end: moment(t.time_date + " " + t.time_end)
            };
          }
          return col;
        })
      : null;
    if (displayCols) {
      displayCols = _.compact(displayCols);
    }
    const displayRowsUnsorted = displayCols
      ? rooms.map((r, k) => {
          const colID = displayCols.map((c, k) => {
            return c.id;
          });
          let row = {
            location: r.room_location,
            capacity: parseInt(r.room_capacity)
          };
          colID.forEach(c => {
            timeslots[selectedDate.value].slots.forEach(ts => {
              if (c === ts.time_id && r.room_id === ts.room_id) {
                row[c] = ts;
              } else if (!row[c]) {
                row[c] = false;
              }
            });
          });
          return row;
        })
      : null;
    const displayRows = displayRowsUnsorted
      ? _.orderBy(
          displayRowsUnsorted,
          ["capacity", "location"],
          ["desc", "asc"]
        )
      : null;
    const submOptionsFiltered =
      selectedTimeslot && submissions
        ? submissions.filter(s => {
            return s.subm_forms !== 0;
          })
        : null;
    const submOptionsUnsorted = submOptionsFiltered
      ? submOptionsFiltered.map((s, k) => {
          const subm = {
            name: "subm",
            label: "#" + s.subm_id + " " + toHTML(s.subm_title),
            title: toHTML(s.subm_title),
            value: s.subm_id,
            data: s
          };
          return subm;
        })
      : null;
    const submOptions = submOptionsUnsorted
      ? _.orderBy(submOptionsUnsorted, "title", "asc")
      : null;
    return (
      <div className="">
        <Helmet>
          <title>{lang_schedule.timeslots_helmet}</title>
        </Helmet>
        <div className="row">
          <div className="col-3 border bg-light">
            <div className="row">
              <div className="col">
                <h4 className="my-3">{lang_schedule.rooms_timeslots_new}</h4>
                {roomOptions ? (
                  <SelectInput
                    name="room"
                    label={lang_schedule.rooms_timeslots_room_select}
                    options={roomOptions}
                    value={room}
                    onChange={this.handleSelectChange}
                  />
                ) : (
                  ""
                )}
                {timeOptions ? (
                  <React.Fragment>
                    <button
                      className="btn btn-primary mb-3"
                      onClick={this.handleCheckAll}
                    >
                      {lang_schedule.rooms_timeslots_room_checkAll}
                    </button>
                    <button
                      className="btn btn-danger ml-2 mb-3"
                      onClick={this.handleUncheckAll}
                    >
                      {lang_schedule.rooms_timeslots_room_uncheckAll}
                    </button>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {timeOptions
                  ? timeOptions.map((t, k) => {
                      return (
                        <Checkbox
                          key={k}
                          name={t.name}
                          label={t.label}
                          value={t.value}
                          checked={t.checked}
                          onChange={this.handleChangeChk}
                          disabled={room ? false : true}
                        />
                      );
                    })
                  : ""}
                {timeOptions ? (
                  <React.Fragment>
                    <button
                      className="btn btn-block btn-success mt-3"
                      onClick={this.handleSubmit}
                    >
                      {lang_schedule.submit}
                    </button>
                    <button
                      className="btn btn-block btn-warning mt-2 mb-3"
                      onClick={this.handleCancel}
                    >
                      {lang_schedule.cancel}
                    </button>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {selectedTimeslot ? (
                  <React.Fragment>
                    <h5 className="my-3">
                      {lang_schedule.rooms_timeslots_panel}
                    </h5>
                    <h6>
                      {selectedTimeslot.room_location +
                        " (" +
                        selectedTimeslot.room_capacity +
                        ") | " +
                        selectedTimeslot.time_date +
                        ", " +
                        formatHour(
                          selectedTimeslot.time_date,
                          selectedTimeslot.time_begin
                        ) +
                        lang_schedule.fromto +
                        formatHour(
                          selectedTimeslot.time_date,
                          selectedTimeslot.time_end
                        )}
                    </h6>
                    <SelectInput
                      name="subm"
                      label={lang_schedule.rooms_timeslots_subm_select}
                      options={submOptions}
                      value={selectedSubm}
                      onChange={this.handleSelectChange}
                    />
                    {selectedSubm ? (
                      <React.Fragment>
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.handleSubmitSubm}
                        >
                          {lang_schedule.submit}
                        </button>
                        <button
                          className="btn btn-block btn-warning"
                          onClick={this.handleCancelSubm}
                        >
                          {lang_schedule.cancel}
                        </button>
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-9 border">
            <h2 className="my-2">{lang_schedule.rooms_timeslots_header}</h2>
            {dateOptions ? (
              <SelectInput
                name="date"
                label={lang_schedule.rooms_timeslots_date_select}
                options={dateOptions}
                value={selectedDate}
                onChange={this.handleSelectChange}
              />
            ) : (
              ""
            )}
            {selectedDate ? (
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th width="10%">{lang_schedule.rooms_timeslots_rooms}</th>
                    {times.map((t, k) => {
                      if (t.time_date === selectedDate.date) {
                        const begin = moment(t.time_date + " " + t.time_begin);
                        const end = moment(t.time_date + " " + t.time_end);
                        return (
                          <th key={k} width={90 / times.length + "%"}>
                            {begin.format("HH:mm") +
                              lang_schedule.fromto +
                              end.format("HH:mm")}
                          </th>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tr>
                </thead>
                <tbody>
                  {displayRows
                    ? displayRows.map((r, k) => {
                        return (
                          <tr key={k}>
                            <td>
                              <div>{r.location}</div>
                              <div>{"(" + r.capacity + ")"}</div>
                            </td>
                            {displayCols.map((c, key) => {
                              let format =
                                r[c.id] && r[c.id].subm_meta
                                  ? "text-primary"
                                  : "text-body";
                              const style = r[c.id]
                                ? {
                                    textAlign: "center",
                                    cursor: "pointer"
                                  }
                                : {};
                              format +=
                                selectedTimeslot &&
                                selectedTimeslot.room_id === r[c.id].room_id &&
                                selectedTimeslot.time_id === r[c.id].time_id
                                  ? " font-weight-bold bg-light"
                                  : "";
                              return (
                                <td
                                  key={key}
                                  className={format}
                                  style={style}
                                  onClick={
                                    r[c.id]
                                      ? () => this.handleSelectTimeslot(r[c.id])
                                      : null
                                  }
                                >
                                  {r[c.id] && r[c.id].subm_meta
                                    ? toHTML(shorten(r[c.id].subm_title, 100))
                                    : r[c.id]
                                    ? lang_schedule.rooms_timeslots_empty
                                    : ""}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleRoomsTimeslots;
