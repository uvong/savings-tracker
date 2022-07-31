import React from "react";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import App from "./App";

const DepositForm = (props) => {
  const [newAmount, setNewAmount] = useState(0);

  const createDeposit = async () => {
    await addDoc(props.depositsRef, {
      amount: Number(newAmount),
      depositDate: new Date(),
    });
    props.getDeposits(props.id);
  };

  // // const validateDepositAmount = () => {
  //   if (props.totalAmount <  amount) {
      //console.log("amount too large")
      // can have a red textbox here or make submit button unable to click
  //   }
  // }

  // const sumDepositAmount = () => {
  //   map to sum amount, not sure if here or in App.js
  // }
  return (
    <div>
      <input
        type="number"
        placeholder="Amount $"
        onChange={(event) => {
          setNewAmount(event.target.value);
        }}
      />
      <button onClick={createDeposit}> Create Deposit</button>
    </div>
  );
};

export default DepositForm;
