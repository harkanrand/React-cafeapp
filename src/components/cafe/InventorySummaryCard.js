import React from 'react';

const InventorySummaryCard = ({ inventoryList }) => {
  return (
    <div className="card z-depth-0">
      <div className="card-content">
        <span className="card-title">Inventories to conduct</span>
      </div>
      <div className="card-action white ligthen-4 grey-text">
        <div>
          <p>Daily inventory task...</p>
          <p>Weekly inventory task...</p>
        </div>
      </div>
    </div>
  );
};

export default InventorySummaryCard;
