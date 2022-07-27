import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import GoalList from "./GoalList";

function App() {
  const [newName, setNewName] = useState("");
  const [newTotalAmount, setNewTotalAmount] = useState(100);
  const [goals, setGoals] = useState([]);
  const goalsCollectionRef = collection(db, "goals");

  const createGoal = async () => {
    await addDoc(goalsCollectionRef, {
      name: newName,
      totalAmount: Number(newTotalAmount),
    });
  };
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
      <input
        placeholder="Goal Name"
        onChange={(event) => {
          console.log(event.target.value);
          setNewName(event.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Total Amount $"
        onChange={(event) => {
          //console.log(typeof(event.target.value));
          setNewTotalAmount(event.target.value);
          console.log(typeof(event.target.value)); //why is this a str lol
        }}
      />
      {/* <input
        type = "submit"
        value = "Create Goal"
      
      
      />
         */}
      
      <button onClick={createGoal}> Create Goal</button>
      <GoalList goalsCollectionRef={goalsCollectionRef} />
      {goals.map((goal) => {
        // console.log(goal);
        // console.log(typeof(goal.goalCreated));
        return (
          <div>
            {/* {" "}
            <h1> Goal: {goal.name} </h1>
            <h1> Total Amount: ${goal.totalAmount}</h1>
            <h1> Goal reached: {String(goal.goalReached)} </h1>
            <div> Date created: {String(goal.goalCreated.toDate())} </div> */}
          </div>
        );
      })}
    </div>
  );
}

export default App;
