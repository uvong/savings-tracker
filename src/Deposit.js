import React from "react";
import { Button, Card, Stack } from "react-bootstrap";

function Deposit(props) {
  const depositDate = props.depositDate.toDate();
  const deleteDeposit = () => {
    props.deleteDeposit(props.id);
  };

  return (
    <Card className="m-2">
      <Card.Title className="m-2">
        <div className="">${props.amount}</div>
      </Card.Title>
      <Stack direction="horizontal" gap="4" className="m-2">
        <div>{depositDate.toLocaleDateString()}</div>
        <div> Sum: ${props.depositAmount}</div>
        <Button
          className="ms-auto"
          size="sm"
          variant="outline-danger"
          onClick={deleteDeposit}
        >
          Delete Deposit
        </Button>
      </Stack>
    </Card>
  );
}

export default Deposit;
