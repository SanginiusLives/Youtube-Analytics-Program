import React from "react";

const Item = ({ label, value }) => {
    // Render the regular value
    return (
      <div className="item">
        <p className="stat">{value}</p>
        <p>{label}</p>
      </div>
    );
};

export default Item;