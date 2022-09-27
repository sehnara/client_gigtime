import React from "react";

function BodyTop({ title }) {
  return (
    <div className=" m-8 mb-4  flex items-center justify-between">
      <h1 className="text-xl font-bold">{title} 설정하기</h1>
    </div>
  );
}

export default BodyTop;
