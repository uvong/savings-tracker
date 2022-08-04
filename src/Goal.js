import React from "react";
import DepositForm from "./DepositForm";
import "./Goal.css";

function Goal(props) {
  const dateCreated = props.dateCreated.toDate();
  const depositsRef = props.getDepositsRef(props.id);
  const handleClick = () => {
    props.getDeposits(props.id);
    props.getCurrentGoal(props.id);
  };

  return (
    <div className="Goal-item">
      <button className="Name-button" onClick={handleClick}>
        {props.name}
      </button>
      <div>Total Amount: ${props.totalAmount}</div>
      <div> Goal reached: {String(props.isReached)} </div>
      <div> Date created: {dateCreated.toDateString()} </div>
      <button onClick={() => props.deleteGoal(props.id)}> Delete </button>
      <DepositForm
        depositsRef={depositsRef}
        getDeposits={props.getDeposits}
        id={props.id}
        totalAmount={props.totalAmount}
        addDeposit = {props.addDeposit}
      />
    </div>
  );
}

export default Goal;
