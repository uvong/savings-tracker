import React from "react";

function Goal(props) {
  const dateCreated = props.dateCreated.toDate();
  return (
    <div>
      <h1> Name: {props.name} </h1>
      <h1> Total Amount: ${props.totalAmount}</h1>
      <h1> Goal reached: {String(props.isReached)} </h1>
      <div> Date created: {dateCreated.toDateString()} </div>
    </div>
  );
}

export default Goal;
