import React from "react";
import { useState } from "react";
import { addDoc } from "firebase/firestore";

function GoalForm(props) {
  const [newName, setNewName] = useState("");
  const [newTotalAmount, setNewTotalAmount] = useState(0);

  const createGoal = async () => {
    await addDoc(props.goalsCollectionRef, {
      name: newName,
      totalAmount: Number(newTotalAmount),
      dateCreated: new Date(),
      isReached: false,
    });
  };
  return (
    <div>
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
          setNewTotalAmount(event.target.value);
          console.log(typeof event.target.value); //why is this a str lol
        }}
      />
      <button onClick={createGoal}> Create Goal</button>
    </div>
  );
}

export default GoalForm;
