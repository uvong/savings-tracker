import React from "react";

const ProgressBar = (props) => {
  console.log(props);
  const { value, max } = props;

  const findPercentage = () => {
    //console.log("find% function")
    let percentageFound = Math.round((value / max) * 100);
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
