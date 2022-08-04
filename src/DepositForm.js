import React from "react";
import { useState } from "react";

const DepositForm = (props) => {
  const defaultDeposit = {
    amount: "",
    depositDate: new Date(),
  };

  const defaultErrorMessages = {
    messageError: "",
  };

  const [formData, setFormData] = useState(defaultDeposit);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = parseInt(event.target.value);

    const newFormData = { ...formData };
    newFormData[stateName] = inputValue;

    setFormData(newFormData);
    console.log(newFormData);
  };

  const handleSubmit = (event) => {
    // console.log("in handle submit");
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.addDeposit(formData);
      setFormData(defaultDeposit);
      props.getDeposits(props.id);
    }
  };

  const validate = () => {
    // console.log("in validate");
    // console.log(formData);
    let messageError = "";
    if (formData.amount === "") {
      messageError = "Input must be a number";
      setErrorMessages({ messageError });
      return false;
    }
    if (formData.amount > props.totalAmount) {
      messageError = "Deposit cannot be greater than Goal Amount";
      setErrorMessages({ messageError });
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
        <div>{errorMessages.messageError}</div>
        <input type="submit" value="Add Deposit" />
      </form>
    </div>
  );
};

export default DepositForm;
