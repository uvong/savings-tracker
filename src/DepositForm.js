import React from "react";
import { useState } from "react";
import { addDoc, collectiom } from "firebase/firestore";

function DepositForm(props) {
  const defaultDeposit = {
    amount: 0
  }
  console.log(props);
  const [newDeposit, setNewDeposit] = useState(defaultDeposit);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newDepositData = { ...newDeposit };
    newDepositData[stateName] = inputValue;

    setNewDeposit(newDepositData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createDeposit(newDeposit);
    setNewDeposit(defaultDeposit);
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label htmlFor="amount"></label>
        <input
          type="number"
          name="amount"
          placeholder="Enter an amount to deposit"
          value={newDeposit.message}
          onChange={onFormChange}
        />
        <div>{newDeposit.messageError}</div>
        <input type="submit" value="Click to deposit" />
      </form>
    </div>
  );
};

export default DepositForm;