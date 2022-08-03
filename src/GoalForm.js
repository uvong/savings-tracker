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
  const [disableGoal, setDisableGoal] = useState(true);
  // trying to disable button but deosn't seem to be working properly

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
      nameError = "Goal Name can't be blank";
      // setDisableGoal(true);
    }

    if (!formData.totalAmount) {
      totalAmountError = "Goal Amount can't be blank";
      // setDisableGoal(true);
    }

    if (nameError || totalAmountError) {
      setErrorMessages({ nameError, totalAmountError });
      // setDisableGoal(true);
      return false;
    }
    // setDisableGoal(false);
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
