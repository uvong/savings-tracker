import React from "react";
import { Modal } from "react-bootstrap";
import DepositForm from "./DepositForm";

function DepositFormModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Create a new deposit</Modal.Title>
      </Modal.Header>
      <div className="body">
        <DepositForm
          getAllDeposits={props.getAllDeposits}
          id={props.id}
          totalAmount={props.totalAmount}
          addDeposit={props.addDeposit}
          sumDepositAmount={props.sumDepositAmount}
          deposits={props.deposits}
          currentDeposits={props.currentDeposits}
          handleClose={props.handleClose}
        />
      </div>
    </Modal>
  );
}

export default DepositFormModal;
