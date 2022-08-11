import React, { useState } from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import DepositModal from "./DepositModal";

function Goal(props) {
  const [showDepositModal, setShowDepositModal] = useState(false);

  const handleClick = () => {
    props.setCurrentDeposits(currentDeposits);
    props.getCurrentGoal(props.id);
  };
  const currentDeposits = props.getCurrentGoalDeposits(props.id);
  const currentSum = props.sumDepositAmount(currentDeposits);

  return (
    <Card className="my-2">
      <DepositModal
        show={showDepositModal}
        getAllDeposits={props.getAllDeposits}
        id={props.id}
        totalAmount={props.totalAmount}
        addDeposit={props.addDeposit}
        sumDepositAmount={props.sumDepositAmount}
        deposits={props.deposits}
        handleClose={() => setShowDepositModal(false)}
        setCurrentDeposits={props.setCurrentDeposits}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between mb-3 fw-normal">
          <div>{props.name}</div>
          <div>
            ${currentSum} / ${props.totalAmount}
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          max={props.totalAmount}
          now={currentSum}
        />
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button
            size="sm"
            variant="outline-dark"
            className="ms-auto"
            onClick={handleClick}
          >
            View Deposits
          </Button>
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => {
              setShowDepositModal(true);
            }}
          >
            Add Deposit
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            className=""
            onClick={() => props.deleteGoal(props.id)}
          >
            Delete Goal
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default Goal;
