import React from "react";

function Deposit(props) {
  const depositDate = props.depositDate.toDate();
  return (
    <div>
      <h1>Amount: ${props.amount}</h1>
      <div>Deposit Date: {depositDate.toDateString()}</div>
    </div>
  );
}

export default Deposit;
