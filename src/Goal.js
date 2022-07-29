import React from "react";

function Goal(props) {
  const dateCreated = props.dateCreated.toDate();
  const getDeposits = () => props.getDeposits(props.id);

  return (
    <div>
      <h1>
        <button onClick={getDeposits}>{props.name}</button>{" "}
      </h1>
      <h1> Total Amount: ${props.totalAmount}</h1>
      <h1> Goal reached: {String(props.isReached)} </h1>
      <div> Date created: {dateCreated.toDateString()} </div>
      <button onClick={() => props.deleteGoal(props.id)}> Delete </button>
    </div>
  );
}

export default Goal;
