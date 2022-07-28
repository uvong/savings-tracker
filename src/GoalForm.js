import React from "react";
import { useState } from "react";
import { addDoc } from "firebase/firestore";

const defaultGoal = {
  name: "",
  totalAmount: 0,
  dateCreated: new Date(),
  isReached: false,
};

function GoalForm(props) {
  const [newName, setNewName] = useState("");
  const [newTotalAmount, setNewTotalAmount] = useState(0);
  const [formData, setFormData] = useState(defaultGoal);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;
    setFormData(newFormData);
  };

  // const createGoal = async () => {
  //   await addDoc(props.goalsCollectionRef, {
  //     name: newName,
  //     totalAmount: Number(newTotalAmount),
  //     dateCreated: new Date(),
  //     isReached: false,
  //   });
  // };
  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        onChange={onFormChange}
      />

      <input
        type="number"
        name="totalAmount"
        placeholder="Total Amount $"
        onChange={onFormChange}
      />
      <button onClick={props.createGoal(formData)}>Create Goal</button>
    </div>
  );
}

export default GoalForm;
