import React from "react";
import dogHeart from "../images/dog_heart.png";

function Empty({ text, margin }) {
  return (
    <div
      e
      className={` w-full bg-red-140 h-full flex flex-col justify-center items-center`}
    >
      <img className={`w-52 mt-${margin}`} src={dogHeart} />
      <h1 className="text-xl mt-4 font-bold">{text}이 없어요.</h1>
    </div>
  );
}

export default Empty;
