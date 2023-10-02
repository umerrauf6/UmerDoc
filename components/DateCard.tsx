import React from "react";

const DateCard = ({ date }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg m-4">
      <p className="text-xl font-bold mb-2">{date}</p>
    </div>
  );
};

export default DateCard;
