import React from "react";
import { Modal } from "react-bootstrap";
import GoalForm from "./GoalForm";

function GoalModal({
  show,
  handleClose,
  addGoal,
  goalsCollectionRef,
  getGoals,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">Create a new goal</Modal.Title>
      </Modal.Header>
      <div className="body">
        <GoalForm
          addGoal={addGoal}
          goalsCollectionRef={goalsCollectionRef}
          getGoals={getGoals}
        />
      </div>
    </Modal>
  );
}

export default GoalModal;
