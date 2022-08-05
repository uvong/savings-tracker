import React from "react";
import Deposit from "./Deposit";
import "./DepositList.css";

function DepositList(props) {
  const depositsComponents = () => {
    let depositAmount = 0;
    const eachComponent = props.deposits.map((deposit) => {
      depositAmount += deposit.amount;
      return (
        <Deposit
          key={deposit.id}
          id={deposit.id}
          amount={deposit.amount}
          depositDate={deposit.depositDate}
          depositAmount={depositAmount}
          deleteDeposit={props.deleteDeposit}
        />
      );
    });
    return eachComponent;
  };

  return (
    <div>
      <div>Current Sum: ${props.sumDepositAmount(props.deposits)} </div>
      <div className="Deposits-display">{depositsComponents()} </div>
    </div>
  );
}

export default DepositList;
