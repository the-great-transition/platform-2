import React from "react";
import { Link } from "react-router-dom";
import { schedule as lang_schedule } from "../language/fr";

const ScheduleMenu = () => {
  return (
    <div className="row bg-light">
      <div className="col-3">
        <Link className="btn btn-block btn-warning" to="/schedule">
          {lang_schedule.menu_schedule}
        </Link>
      </div>
      <div className="col-3">
        <Link className="btn btn-block btn-warning" to="/schedule/timeslots">
          {lang_schedule.menu_timeslots}
        </Link>
      </div>
      <div className="col-3">
        <Link className="btn btn-block btn-warning" to="/schedule/rooms">
          {lang_schedule.menu_rooms}
        </Link>
      </div>
      <div className="col-3">
        <Link
          className="btn btn-block btn-warning"
          to="/schedule/rooms-timeslots"
        >
          {lang_schedule.menu_rooms_timeslots}
        </Link>
      </div>
    </div>
  );
};

export default ScheduleMenu;
