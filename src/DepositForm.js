import React from "react";
import { addDoc } from "firebase/firestore";
import { useState } from "react";

const DepositForm = (props) => {
  const [newAmount, setNewAmount] = useState(0);

  const createDeposit = async () => {
    await addDoc(props.depositsRef, {
      amount: Number(newAmount),
      depositDate: new Date(),
    });
    props.getDeposits(props.id);
  };

  // const validateDepositAmount = (newAmount) => {
  //   if (props.totalAmount > newAmount) {
  //     console.log("amount too large");

  //     //can have a red textbox here or make submit button unable to click
  //   }
  // };
  // validateDepositAmount(newAmount);

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
