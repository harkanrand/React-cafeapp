import React from "react";

const ProductSummary = ({ product }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{product.description}</span>
      </div>
    </div>
  );
};

export default ProductSummary;
