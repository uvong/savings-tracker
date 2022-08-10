import React from "react";
import Goal from "./Goal";
import "./GoalList";

const GoalList = (props) => {
  return (
    <div>
      {props.goals.map((goal) => {
        return (
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
            addDeposit={props.addDeposit}
            sumDepositAmount={props.sumDepositAmount}
            deposits={props.deposits}
          />
        );
      })}
    </div>
  );
};

export default GoalList;
