import React from "react";

const Square = ({ onClick, value, selection }) => (
  <button value={value} onClick={() => onClick(value)}>
    {selection}
  </button>
);

export default Square;
