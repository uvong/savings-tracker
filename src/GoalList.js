import React from "react";
import Goal from "./Goal";

const GoalList = (props) => {
  return (
    <div>
      <h2>SAVINGS GOALS</h2>
      {props.goals.map((goal) => {
        return (
          <div>
            <Goal
              key={goal.id}
              id={goal.id}
              name={goal.name}
              totalAmount={goal.totalAmount}
              isReached={goal.isReached}
              dateCreated={goal.dateCreated}
              deleteGoal={props.deleteGoal}
              getDeposits={props.getDeposits}
              getDepositsRef={props.getDepositsRef}
              getCurrentGoal={props.getCurrentGoal}
              addDeposit = {props.addDeposit}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
