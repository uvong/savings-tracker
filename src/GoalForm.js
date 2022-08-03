import React from "react";
import { useState } from "react";

const defaultGoal = {
  name: "",
  totalAmount: "",
  dateCreated: new Date(),
  isReached: false,
};

const defaultErrorMessages = {
  nameError: "",
  totalAmountError: "",
};

function GoalForm(props) {
  const [formData, setFormData] = useState(defaultGoal);
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);

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
      props.addGoal(formData);
      setFormData(defaultGoal);
    }
  };

  const validate = () => {
    let nameError = "";
    let totalAmountError = "";

    if (!formData.name) {
      nameError = "Name can't be blank";
    }

    if (!formData.totalAmount) {
      totalAmountError = "Amount can't be blank";
    }

    if (nameError || totalAmountError) {
      setErrorMessages({ nameError, totalAmountError });
      return false;
    }

    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          placeholder="Goal Name"
          value={formData.name}
          onChange={onFormChange}
        />
        <div>{errorMessages.nameError}</div>
        <label htmlFor="totalAmount"></label>
        <input
          type="number"
          name="totalAmount"
          placeholder="Goal Amount"
          value={formData.totalAmount}
          onChange={onFormChange}
        />
        <div>{errorMessages.totalAmountError}</div>
        <input type="submit" value="Add Goal" />
      </form>
    </div>
  );
}

export default GoalForm;
