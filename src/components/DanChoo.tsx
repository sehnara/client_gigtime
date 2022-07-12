import React from "react";

type DanChooProps = {
  data: [];
};

const DanChoo = () => {
  return (
    <div className="w-28 h-28 rounded-xl shadow-xl shadow-black-500 mr-2 mb-2 text-center flex flex-col justify-center">
      <h1 className="font-bold text-3xl text-cyan-500">49</h1>
      <p className="text-xs px-3 text-gray-500 mt-1">긱타임으로 일 한 시간</p>
    </div>
  );
};

export default DanChoo;
