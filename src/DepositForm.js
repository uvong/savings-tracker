import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./DepositForm.css";

const DepositForm = (props) => {
  const defaultDeposit = {
    amount: "",
    depositDate: new Date(),
    goalId: props.id,
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      props.addDeposit(formData);
      setFormData(defaultDeposit);
      props.getAllDeposits();
    }
  };

  const findDifference = () => {
    let difference =
      props.totalAmount - props.sumDepositAmount(props.currentDeposits);
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
      messageError =
        "This would exceed your goal amount, enter a smaller deposit";
      setErrorMessages({ messageError });
      return false;
    }
    return true;
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex flex-column">
      <Form.Group className="m-2">
        <Form.Label className="w-100">Deposit Amount</Form.Label>
        <label htmlFor="amount"></label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onFormChange}
        />
        <div id="Error-msg">{errorMessages.messageError}</div>
      </Form.Group>
      <Button
        variant="outline-success"
        className="w-50 my-2 align-self-center"
        type="submit"
      >
        Add Deposit
      </Button>
    </Form>
  );
};

export default DepositForm;
