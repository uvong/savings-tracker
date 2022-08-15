import React from "react";
import { Modal } from "react-bootstrap";
import DepositList from "./DepositList";

function DepositListModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Deposits</Modal.Title>
      </Modal.Header>
      <DepositList
        currentDeposits={props.currentDeposits}
        deleteDeposit={props.deleteDeposit}
        setCurrentDeposits={props.setCurrentDeposits}
      />
      <div className="body"></div>
    </Modal>
  );
}

export default DepositListModal;
