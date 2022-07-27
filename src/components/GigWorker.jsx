import React from "react";
import man from "../images/man.png";

function GigWorker({ bottomBorder, name }) {
  return (
    <div className={`flex items-center ${bottomBorder} border-gray-100`}>
      <img className="mx-2 mb-2 w-8 h-8" src={man} />
      <p className="ml-2 text-base font-bold ">{name}</p>
    </div>
  );
}

export default GigWorker;
