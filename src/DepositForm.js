import React from "react";
import { addDoc } from "firebase/firestore";
import { useState } from "react";

const DepositForm = (props) => {
  const defaultDeposit = {
    amount: "",
    depositDate: new Date(),
  };

  const [formData, setFormData] = useState(defaultDeposit);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = parseInt(event.target.value);

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
  };

  let errorMsg = "";
  const validate = () => {
    let messageError = "";
    
    if (formData.amount > props.totalAmount) {
      messageError = "Deposit cannot be greater than Goal Amount";
      errorMsg = messageError
      return false;
    }
    return true;
  };

  return (
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
        <div>{errorMsg}</div>
        <input type="submit" value="Add Deposit" />
      </form>
    </div>
  );
};

export default DepositForm;
