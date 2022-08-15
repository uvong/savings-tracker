import React from "react";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { auth } from "./firebase-config";
import "./GoalForm.css";

const defaultErrorMessages = {
  nameError: "",
  totalAmountError: "",
};
function GoalForm(props) {
  const user = auth.currentUser;
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
      props.handleClose();
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
    <>
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <Form.Group className="mx-2">
          <Form.Label className="w-100">Goal Name</Form.Label>
          <label htmlFor="name"></label>
          <input
            className="goalForm"
            type="text"
            name="name"
            value={formData.name}
            onChange={onFormChange}
          />
          {errorMessages.nameError && (
            <Alert
              className="mt-2 d-flex align-items-center"
              style={{ height: "10px" }}
              variant="danger"
            >
              {errorMessages.nameError}
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mx-2">
          <Form.Label className="w-100">Goal Amount</Form.Label>
          <label htmlFor="totalAmount"></label>
          <input
            className="goalForm"
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={onFormChange}
          />
          {errorMessages.totalAmountError && (
            <Alert
              className="mt-2 d-flex align-items-center"
              style={{ height: "10px" }}
              variant="danger"
            >
              {errorMessages.totalAmountError}
            </Alert>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="success"
          className="my-2 w-50 align-self-center"
        >
          Add Goal
        </Button>
      </Form>
    </>
  );
}

export default GoalForm;
