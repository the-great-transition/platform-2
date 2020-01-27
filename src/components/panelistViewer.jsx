import React, { Component } from "react";
import Panelist from "./panelist";
import { getResource } from "../services/resourceService";
import { navPreviousNext } from "../utilities/array";

class PanelistViewer extends Component {
  state = {
    panelist: false,
    navigationDisabled: { previous: true, next: true }
  };

  componentDidMount() {
    this.getPanelist(this.props.location.pathname);
  }

  async getPanelist(pathname) {
    const splitPath = pathname.split("/");
    const splitSlug = splitPath[2].split("-");
    const panelist = await getResource("part", splitSlug[0]);
    if (panelist === null) {
      this.props.history.goBack();
    } else {
      this.setState({ panelist });
    }
  }

  handleStatusChange = ({ value: status }) => {
    const { panelist } = this.state;
    panelist.part_status = status;
    this.setState({ panelist }, () => {
      this.updateStatus();
    });
  };

  handleNav = object => {
    this.props.history.replace(object);
    this.getPanelist(object.pathname);
  };

  handleEscape = () => {
    this.props.history.goBack();
  };

  handleNavDisable = (tableArray, tableIndex) => {
    const limits = navPreviousNext(tableArray, tableIndex);
    const { previous, next } = limits;
    const { navigationDisabled } = this.state;
    navigationDisabled.previous = !previous;
    navigationDisabled.next = !next;
    this.setState({ navigationDisabled });
    return limits;
  };

  handleModify = () => {
    const { panelist } = this.state;
    this.props.history.push({
      pathname: "/modify/panelists/" + panelist.part_id + "-" + panelist.part_id
    });
  };

  render() {
    return this.state.panelist ? (
      <div className="border border-light shadow" style={{ padding: 10 }}>
        <Panelist
          user={this.props.user}
          data={this.state.panelist}
          location={this.props.location}
          navigationDisabled={this.state.navigationDisabled}
          onNav={this.handleNav}
          onNavDisable={this.handleNavDisable}
          onNavEscape={this.handleEscape}
          onModify={this.handleModify}
          onStatus={this.handleStatusChange}
        />
      </div>
    ) : (
      ""
    );
  }
}

export default PanelistViewer;
