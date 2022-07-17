import React from "react";
import InterviewCard from "../../components/InterviewCard";

const InterviewTimeTable = ({ result }) => {
  const src = result;

  return (
    <div className="overflow-scroll h-96">
      {src.map((el) => (
        <InterviewCard
          date={el.interview_date}
          time={el.interview_time}
          rejectFlag={el.reject_flag}
          resultFlag={el.result_flag}
          link={el.link}
          state={el.state}
          storeName={el.store_name}
          storeAdd={el.store_address}
          storeType={el.store_type}
        />
      ))}
    </div>
  );
};

export default InterviewTimeTable;
