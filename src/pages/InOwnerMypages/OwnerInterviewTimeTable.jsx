import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import WaitResultCard from "../../components/WaitResultCard";

const OwnerInterviewTimeTable = () => {
  
  return (
    <>
      <WaitResultCard />
      <div className="m-8 h-64">
        <h1 className="font-bold">면접예정</h1>
      </div>
      <div className="m-8 h-64">
        <h1 className="font-bold">면접완료</h1>
      </div>
    </>
  );
};

export default OwnerInterviewTimeTable;
