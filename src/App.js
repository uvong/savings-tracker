import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import GoalList from "./GoalList";

function App() {
  const [goals, setGoals] = useState([]);
  const goalsCollectionRef = collection(db, "goals");
  // useEffect(() => {
  //   const getGoals = async () => {
  //     const data = await getDocs(goalsCollectionRef);
  //     // console.log("this is data");
  //     // console.log(data);
  //     setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getGoals();
  // }, []);
  return (
    <div className="App">
      <input placeholder="Goal Name" />
      <input type="integer" placeholder="Total Amount $" />
      <button> Create Goal</button>
      <GoalList goalsCollectionRef={goalsCollectionRef} />
      {goals.map((goal) => {
        // console.log(goal);
        // console.log(typeof(goal.goalCreated));
        return (
          <div>
            {" "}
            <h1> Name: {goal.name} </h1>
            <h1> Total Amount: ${goal.totalAmount}</h1>
            <h1> Goal reached: {String(goal.goalReached)} </h1>
            <div> Date created: {String(goal.goalCreated.toDate())} </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
