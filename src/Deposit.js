import React from "react";

function Deposit(props) {
  const depositDate = props.depositDate.toDate();
  const deleteDeposit = () => {
    props.deleteDeposit(props.id);
  };

  return (
    <div>
      <h1>Amount: ${props.amount}</h1>
      <div>Deposit Date: {depositDate.toDateString()}</div>
      <div> Sum: ${props.depositAmount}</div>
      <button onClick={deleteDeposit}>Delete Deposit</button>
    </div>
  );
}

export default Deposit;
