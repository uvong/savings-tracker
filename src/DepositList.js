import React from "react";
import Deposit from "./Deposit";

function DepositList(props) {
  return (
    <div>
      {props.deposits.map((deposit) => {
        return (
          <div>
            <Deposit
              key={deposit.id}
              id={deposit.id}
              amount={deposit.amount}
              depositDate={deposit.depositDate}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DepositList;
