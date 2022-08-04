import React from "react";
import { addDoc } from "firebase/firestore";
import { useState } from "react";

const DepositForm = (props) => {
  const defaultDeposit = {
    amount: "",
    dateCreated: new Date(),
    messageError: "",
  };
  //const [newAmount, setNewAmount] = useState(0);
  const [formData, setFormData] = useState(defaultDeposit);
  //const [disableDeposit, setDisableDeposit] = useState(true);

  // const createDeposit = async () => {
  //   await addDoc(props.depositsRef, {
  //     amount: Number(newAmount),
  //     depositDate: new Date(),
  //   });
  //   props.getDeposits(props.id);
  // };

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;

    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;

    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.addDeposit(formData);
      console.log("in handlesubmit function");
      setFormData(defaultDeposit);
      props.getDeposits(props.id);
    }
    console.log("CONFIRMATION THIS WORKS");
  };

  const validate = () => {
    let messageError = "";

    if (formData.amount > props.totalAmount) {
      messageError = "Deposit cannot be greater than Goal Amount";
      setFormData({ messageError });
      return false;
    }
    return true;
  };

  // const validateDepositAmount = (newAmount) => {
  //   if (props.totalAmount > newAmount) {
  //     console.log("amount too large");

  //     //can have a red textbox here or make submit button unable to click
  //   }
  // };
  // validateDepositAmount(newAmount);

  return (
    // <div>
    //   <input
    //     type="number"
    //     placeholder="Amount $"
    //     onChange={(event) => {
    //       setNewAmount(event.target.value);
    //     }}
    //   />
    //   <button onClick={createDeposit}> Create Deposit</button>
    // </div>
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount"></label>
        <input
          type="number"
          name="amount"
          placeholder="Amount $"
          value={formData.amount}
          onChange={onFormChange}
        />
        <div>{formData.messageError}</div>
        <input type="submit" value="Add Deposit" />
      </form>
    </div>
  );
};

export default DepositForm;
