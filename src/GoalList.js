import React from "react";
import Goal from "./Goal";

const GoalList = (props) => {
  return (
    <div>
      {props.goals.map((goal) => {
        console.log(goal);
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
