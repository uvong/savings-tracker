import React from "react";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import Goal from "./Goal";

const GoalList = (props) => {
  const goalsCollectionRef = props.goalsCollectionRef;
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const getGoals = async () => {
      const data = await getDocs(goalsCollectionRef);
      setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getGoals();
  }, []);
  return (
    <div>
      {goals.map((goal) => {
        return (
          <div>
            <Goal
              key={goal.id}
              id={goal.id}
              name={goal.name}
              totalAmount = {goal.totalAmount}
              goalReached={goal.goalReached}
              goalCreated={goal.goalCreated}
            />
            {/* <h1> Name: {goal.name} </h1>
            <h1> Total Amount: ${goal.totalAmount}</h1>
            <h1> Goal reached: {String(goal.goalReached)} </h1>
            <div> Date created: {String(goal.goalCreated.toDate())} </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
