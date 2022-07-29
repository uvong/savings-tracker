import React from "react";
import Goal from "./Goal";

const GoalList = (props) => {
  return (
    <div>
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
