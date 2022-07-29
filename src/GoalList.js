import React from "react";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import Goal from "./Goal";

const GoalList = (props) => {
  // const goalsCollectionRef = props.goalsCollectionRef;
  // const [goals, setGoals] = useState([]);

  // useEffect(() => {
  //   const getGoals = async () => {
  //     const data = await getDocs(goalsCollectionRef);
  //     setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getGoals();
  // }, []);
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
