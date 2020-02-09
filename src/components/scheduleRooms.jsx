import React, { Component } from "react";
import Helmet from "react-helmet";
import Input from "../common/input";
import SelectInput from "../common/selectInput";
import TextArea from "../common/textarea";
import {
  getResource,
  postResource,
  deleteResource
} from "../services/resourceService";
import { schedule as lang_schedule } from "../language/fr";

var _ = require("lodash");

class ScheduleRooms extends Component {
  state = {
    rooms: {},
    insert: {
      id: null,
      location: "",
      capacity: 0,
      type: {},
      av: {},
      comments: ""
    },
    emptyInsert: {
      id: null,
      location: "",
      capacity: 0,
      type: {},
      av: {},
      comments: ""
    },
    newmodify: "new"
  };

  componentDidMount() {
    this.populate();
  }

  async populate() {
    const rooms = await getResource("room");
    this.setState({ rooms });
  }

  handleChange = e => {
    const { name, value, type } = e.currentTarget;
    const insert = { ...this.state.insert };
    insert[name] = type === "number" ? Math.round(value) : value;
    this.setState({ insert });
  };

  handleSelectChange = e => {
    const { insert } = this.state;
    const nam = e.name;
    const val = e;
    insert[nam] = val;
    this.setState({ insert });
  };

  editRoom = e => {
    const insert = {
      id: e.room_id,
      location: e.room_location,
      capacity: e.room_capacity,
      type: lang_schedule.rooms_type_options[e.room_type],
      av: lang_schedule.rooms_av_options[e.room_av],
      comments: e.room_comments
    };
    this.setState({ insert, newmodify: "modify" });
  };

  async deleteRoom(id) {
    try {
      await deleteResource("room", id);
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
    const { id, location, capacity, type, av, comments } = this.state.insert;
    const data = {
      room_location: location,
      room_capacity: capacity,
      room_type: type.value,
      room_av: av.value,
      room_comments: comments
    };
    try {
      const string = id === null ? "room" : "room/" + id;
      await postResource(string, data);
      this.populate();
      this.setState({ insert: this.state.emptyInsert, newmodify: "new" });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { rooms, newmodify } = this.state;
    const { id, location, capacity, type, av, comments } = this.state.insert;
    let rooms_sorted =
      rooms && rooms.length > 0
        ? _.orderBy(rooms, ["room_capacity"], ["desc"])
        : null;
    return (
      <div>
        <Helmet>
          <title>{lang_schedule.rooms_helmet}</title>
        </Helmet>
        <div className="row">
          <div className="col-3 border bg-light">
            {newmodify === "new" ? (
              <h4 className="my-3">{lang_schedule.room_new}</h4>
            ) : (
              <h4 className="my-3">{lang_schedule.room_modify}</h4>
            )}
            <Input
              type="text"
              name="location"
              value={location}
              label={lang_schedule.room_location}
              onChange={this.handleChange}
            />
            <Input
              type="number"
              name="capacity"
              value={capacity}
              label={lang_schedule.room_capacity}
              onChange={this.handleChange}
              step={1}
              min={1}
            />
            <SelectInput
              name="type"
              label={lang_schedule.room_type}
              options={lang_schedule.rooms_type_options}
              value={type}
              onChange={this.handleSelectChange}
            />
            <SelectInput
              name="av"
              label={lang_schedule.room_av}
              options={lang_schedule.rooms_av_options}
              value={av}
              onChange={this.handleSelectChange}
            />
            <TextArea
              name="comments"
              value={comments}
              rows={3}
              label={lang_schedule.room_comments}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-block btn-success mb-3"
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
            <h2 className="my-2">{lang_schedule.rooms_header}</h2>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th width="8%">{lang_schedule.rooms_location}</th>
                  <th width="8%">{lang_schedule.rooms_capacity}</th>
                  <th width="15%">{lang_schedule.rooms_type}</th>
                  <th width="20%">{lang_schedule.rooms_av}</th>
                  <th width="29%">{lang_schedule.rooms_comments}</th>
                  <th width="20"></th>
                </tr>
              </thead>
              <tbody>
                {rooms_sorted && rooms_sorted.length > 0
                  ? rooms_sorted.map((r, k) => {
                      return (
                        <React.Fragment key={k}>
                          <tr
                            className={
                              id === r.room_id ? "text-primary bg-light" : ""
                            }
                          >
                            <td>{r.room_location}</td>
                            <td>{r.room_capacity}</td>
                            <td>
                              {
                                lang_schedule.rooms_type_options[r.room_type]
                                  .label
                              }
                            </td>
                            <td>
                              {lang_schedule.rooms_av_options[r.room_av].label}
                            </td>
                            <td>{r.room_comments}</td>
                            <td align="center">
                              <button
                                className="btn btn-warning"
                                style={{ width: "6em" }}
                                onClick={() => this.editRoom(r)}
                              >
                                {lang_schedule.modify}
                              </button>
                              <button
                                className="btn btn-danger ml-3"
                                style={{ width: "6em" }}
                                onClick={() => this.deleteRoom(r.room_id)}
                              >
                                {lang_schedule.delete}
                              </button>
                            </td>
                          </tr>
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

export default ScheduleRooms;
