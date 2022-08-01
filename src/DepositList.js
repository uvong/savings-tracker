import React from "react";
import Deposit from "./Deposit";

function DepositList(props) {
  const sumDepositAmount = (deposits) => {
    //map to sum amount, not sure if here or in App.js
    //expected output: 19
    let sumTotal = 0;
    for (const deposit of deposits) {
      sumTotal += deposit.amount;
    }
    return sumTotal;
  };

  return (
    <div>
      <h1>Current Sum: {sumDepositAmount(props.deposits)} </h1>
      {props.deposits.map((deposit) => {
        return (
          <div>
            <Deposit
              key={deposit.id}
              id={deposit.id}
              amount={deposit.amount}
              depositDate={deposit.depositDate}
              sumTotal = {sumDepositAmount(props.deposits)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DepositList;
