import React from "react";

function NotFound({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <p className="font-bold text-lg text-gray-500">{title}</p>
      <p>🤗</p>
    </div>
  );
}

export default NotFound;
