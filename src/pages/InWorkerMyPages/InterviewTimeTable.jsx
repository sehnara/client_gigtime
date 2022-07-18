import React from 'react';
import InterviewCard from '../../components/InterviewCard';

const InterviewTimeTable = ({ result }) => {
    const src = result;
    console.log(src);

    return (
        <div className="overflow-scroll h-96">
            {src.map((el) => (
                <InterviewCard
                    key={el.store_name}
                    date={el.interview_date}
                    time={el.interview_time}
                    rejectFlag={el.reject_flag}
                    resultFlag={el.result_flag}
                    link={el.link}
                    state={el.state}
                    interviewId={el.interviewId}
                    storeName={el.store_name}
                    storeAdd={el.store_address}
                    storeType={el.store_type}
                    // key={1}
                    // date={el.date}
                    // time={el.time}
                    // rejectFlag={el.reject_flag}
                    // resultFlag={el.result_flag}
                    // link={el.link}
                    // state={el.state}
                    // interviewId={el.interviewId}
                    // storeName={el.storeName}
                    // storeAdd={el.storeAdd}
                    // storeType={el.storeType}
                />
            ))}
        </div>
    );
};

export default InterviewTimeTable;