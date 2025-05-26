import React from 'react';

export const MasteryBar = ({ value = 0 }) => {

  return (
    <div className="mastery-bar-outer">
      <div
        className="mastery-bar-inner"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
};

export default MasteryBar; 