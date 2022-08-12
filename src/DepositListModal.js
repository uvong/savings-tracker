import React from "react";
import { Modal } from "react-bootstrap";
import DepositList from "./DepositList";

function DepositListModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">List of Deposits</Modal.Title>
      </Modal.Header>
      {/* <DepositList/> */}
      {/* <div> Deposit list</div> */}
      <DepositList
        currentDeposits={props.currentDeposits}
        deleteDeposit={props.deleteDeposit}
        setCurrentDeposits={props.setCurrentDeposits}
      />
      {/* <div> {props.currentDeposits}</div> */}
      <div className="body"></div>
    </Modal>
  );
}

export default DepositListModal;
