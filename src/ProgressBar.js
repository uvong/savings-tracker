import React from "react";

const ProgressBar = (props) => {
  const { value, max } = props;

  const findPercentage = () => {
    let percentageFound = Math.round((value / max) * 100);
    console.log(value, max);
    return percentageFound;
  };
  return (
    <div>
      <progress value={value} max={max} />

      <span> {findPercentage()}% </span>
    </div>
  );
};

export default ProgressBar;
