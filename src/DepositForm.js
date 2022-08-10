import React from "react";
import { useState } from "react";
import "./DepositForm.css";

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
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.addDeposit(formData);
      setFormData(defaultDeposit);
      props.getDeposits(props.id);
    }
  };

  const findDifference = () => {
    let difference = props.totalAmount - props.sumDepositAmount(props.deposits);
    return difference;
  };

  const validate = () => {
    let messageError = "";
    if (formData.amount === "") {
      messageError = "Deposit must be a number";
      setErrorMessages({ messageError });
      return false;
    }

    if (formData.amount > props.totalAmount) {
      messageError = "Deposit cannot be greater than Goal Amount";
      setErrorMessages({ messageError });
      return false;
    }

    if (formData.amount > findDifference()) {
      messageError = "This would exceed your goal amount, enter a smaller deposit";
      setErrorMessages({ messageError });
      return false;
    }
    return true;
  };

  return (
    <div>
      <form className="Deposit-form" onSubmit={handleSubmit}>
        <label htmlFor="amount"></label>
        <input
          id="amount"
          type="number"
          name="amount"
          placeholder="Amount $"
          value={formData.amount}
          onChange={onFormChange}
        />
        <input type="submit" value="Add Deposit" />
        <div id="Error-msg">{errorMessages.messageError}</div>
      </form>
    </div>
  );
};

export default DepositForm;
