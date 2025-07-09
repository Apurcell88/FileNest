import React from "react";

const HomepageCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-blue-900 w-full md:w[300px] hover:scale-105 transition-transform duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default HomepageCard;
