import React from "react";

function Goal(props) {
  return (
    <div>
      <h1> Name: {props.name} </h1>
      <h1> Total Amount: ${props.totalAmount}</h1>
      <h1> Goal reached: {String(props.isReached)} </h1>
      <div> Date created: {String(props.dateCreated.toDate())} </div>
    </div>
  );
}

export default Goal;
