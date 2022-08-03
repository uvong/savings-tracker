import React from "react";
import Deposit from "./Deposit";

function DepositList(props) {
  const sumDepositAmount = (deposits) => {
    let sumTotal = 0; // function that returns s
    for (const deposit of deposits) {
      sumTotal += deposit.amount;
    }
    return sumTotal;
  };
  const depositsComponents = () => {
    let depositAmount = 0;
    const eachComponent = props.deposits.map((deposit) => {
      depositAmount += deposit.amount;
      return (
        //legit returning for loop after each iteration
        <div>
          <Deposit
            key={deposit.id}
            id={deposit.id}
            amount={deposit.amount}
            depositDate={deposit.depositDate}
            depositAmount={depositAmount}
            deleteDeposit={props.deleteDeposit}
          />
        </div>
      );
    });
    return eachComponent;
  };

  return (
    <div>
      <h2>Current Sum: ${sumDepositAmount(props.deposits)} </h2>
      {depositsComponents()}
    </div>
  );
}

export default DepositList;
