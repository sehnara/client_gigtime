import React from "react";
import InterviewCard from "../../components/InterviewCard";
import NotFound from "../../components/NotFound";

const InterviewTimeTable = ({ result, status }) => {
  const src = result;

  return (
    <div className="overflow-scroll h-full ">
      {src.length === 0 ? (
        <NotFound title={"신청한 면접이 아직 없어요!"} />
      ) : (
        src.map((el, index) => (
          <InterviewCard
            key={index}
            date={el.interview_date}
            time={el.interview_time}
            rejectFlag={el.reject_flag}
            resultFlag={el.result_flag}
            link={el.link}
            state={el.state}
            interviewId={el.interview_id}
            storeName={el.store_name}
            storeAdd={el.store_address}
            storeType={el.store_type}
          />
        ))
      )}
    </div>
  );
};

export default InterviewTimeTable;
