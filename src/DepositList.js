import React from "react";
import Deposit from "./Deposit";

function DepositList(props) {

  const depositsComponents = () => {
    let depositAmount = 0;
    const eachComponent = props.deposits.map((deposit) => {
      depositAmount += deposit.amount;
      return (
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
      <h1>Current Sum: ${props.sumDepositAmount(props.deposits)} </h1>
      <p>{depositsComponents()} </p>
    </div>
  );
}

export default DepositList;
