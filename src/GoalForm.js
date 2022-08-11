import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "./firebase-config";

const defaultErrorMessages = {
  nameError: "",
  totalAmountError: "",
};
function GoalForm(props) {
  const [user, setUser] = useState(auth.currentUser);
  const defaultGoal = {
    name: "",
    totalAmount: "",
    dateCreated: new Date(),
    isReached: false,
    owner: user.uid,
  };
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
      nameError = "Goal Name can't be blank";
    }

    if (!formData.totalAmount) {
      totalAmountError = "Amount can't be blank";
    } else if (Number(formData.totalAmount) <= 0) {
      totalAmountError = "Amount must be greater than 0";
    }

    if (nameError || totalAmountError) {
      setErrorMessages({ nameError, totalAmountError });
      return false;
    }
    return true;
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column">
      <div>{user.uid}</div>
      <Form.Group className="ms-2">
        <Form.Label className="w-100">Goal Name</Form.Label>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onFormChange}
        />
        <div>{errorMessages.nameError}</div>
      </Form.Group>
      <Form.Group className="ms-2">
        <Form.Label className="w-100">Goal Amount</Form.Label>
        <label htmlFor="totalAmount"></label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={onFormChange}
        />
        <div>{errorMessages.totalAmountError}</div>
      </Form.Group>
      <Button
        type="submit"
        variant="success"
        className="my-2 w-50 align-self-center"
      >
        Add Goal
      </Button>
    </Form>
  );
}

export default GoalForm;
