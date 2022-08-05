import React from "react";
import "./Deposit.css";

function Deposit(props) {
  const depositDate = props.depositDate.toDate();
  const deleteDeposit = () => {
    props.deleteDeposit(props.id);
  };

  return (
    <div className="Deposit-item">
      <div>${props.amount}</div>
      <div>{depositDate.toLocaleDateString()}</div>
      <div> Sum: ${props.depositAmount}</div>
      <button onClick={deleteDeposit}>Delete Deposit</button>
    </div>
  );
}

export default Deposit;
