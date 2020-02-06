import React from "react";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../common/protectedRoute";
import ScheduleMenu from "./scheduleMenu";
import SchedulePanelsRooms from "./schedulePanelsRooms";
import SchedulePanelsTimeslots from "./schedulePanelsTimeslots";
import ScheduleRooms from "./scheduleRooms";
import ScheduleRoomsTimeslots from "./scheduleRoomsTimeslots";
import ScheduleTimeslots from "./scheduleTimeslots";
import ScheduleViewer from "./scheduleViewer";

const Schedule = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <ScheduleMenu />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Switch>
            <ProtectedRoute
              path="/schedule/panels-rooms"
              component={SchedulePanelsRooms}
            />
            <ProtectedRoute
              path="/schedule/panels-timeslots"
              component={SchedulePanelsTimeslots}
            />
            <ProtectedRoute path="/schedule/rooms" component={ScheduleRooms} />
            <ProtectedRoute
              path="/schedule/rooms-timeslots"
              component={ScheduleRoomsTimeslots}
            />
            <ProtectedRoute
              path="/schedule/timeslots"
              component={ScheduleTimeslots}
            />
            <ProtectedRoute path="/schedule" component={ScheduleViewer} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Schedule;
