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
