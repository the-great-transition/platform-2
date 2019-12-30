import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

class ModalC extends Component {
  state = {
    open: false
  };

  render() {
    let openModal = () => this.setState({ open: true });

    let closeModal = () => this.setState({ open: false });

    let saveAndClose = () => {};
    return (
      <div>
        <button type="button" onClick={openModal}>
          Launch modal
        </button>

        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
            <button className="btn btn-primary" onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalC;
