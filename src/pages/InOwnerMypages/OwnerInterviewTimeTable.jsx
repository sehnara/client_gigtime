import React from "react";
import OwnerPageCard from "../../components/OwnerPageCard";

const OwnerInterviewTimeTable = () => {
  
  return (
    <div className="m-8">
      <h1 className="text-lg font-bold mb-3">승인대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
      </div>
      <h1 className="text-lg font-bold mb-3">면접예정</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
      </div>
      <h1 className="text-lg font-bold mb-3">면접완료</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
        <OwnerPageCard />
      </div>
    </div>
  );
};

export default OwnerInterviewTimeTable;
