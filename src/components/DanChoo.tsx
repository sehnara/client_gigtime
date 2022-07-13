import React from "react";

type DanChooProps = {
  time: number;
  text: string;
};

const DanChoo = ( {time, text} : DanChooProps ) => {
  return (
    <div className="w-28 h-28 rounded-xl shadow-xl shadow-black-500 mr-2 mb-2 text-center flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-cyan-500">{time}</h1>
      <p className="text-xs px-3 text-gray-500 mt-1">{text}</p>
    </div>
  );
};

export default DanChoo;
