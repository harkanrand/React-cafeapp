import React from 'react';

const CafeSummary = ({ cafe }) => {
  let addressBlock = '';
  if (cafe.address) {
    addressBlock = <p>{cafe.address.addressLine1}</p>;
  } else {
    addressBlock = <p></p>;
  }
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{cafe.name}</span>
        {addressBlock}
      </div>
    </div>
  );
};

export default CafeSummary;
