import React from "react";
import { Modal } from "react-bootstrap";
import DepositForm from "./DepositForm";

function DepositModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Create a new deposit</Modal.Title>
      </Modal.Header>
      <div className="body">
        <DepositForm
          depositsRef={props.depositsRef}
          getDeposits={props.getDeposits}
          id={props.id}
          totalAmount={props.totalAmount}
          addDeposit={props.addDeposit}
          sumDepositAmount={props.sumDepositAmount}
          deposits={props.deposits}
        />
      </div>
    </Modal>
  );
}

export default DepositModal;
