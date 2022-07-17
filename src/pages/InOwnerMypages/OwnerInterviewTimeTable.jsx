import React from "react";
import OwnerPageCard from "../../components/OwnerPageCard";
import { useEffect, useState } from "react";
import axios from "axios";

const OwnerInterviewTimeTable = () => {
  const [nowResult, setNowResult] = useState([]);
  const [waitResult, setWaitResult] = useState([]);
  const [willResult, setWillResult] = useState([]);
  const [completeResult, setCompleteResult] = useState([]);

  useEffect(() => {
    const ownerId = sessionStorage.getItem('owner_id');
    axios.post('http://localhost:4000/owner/interview', 
      {
        'owner_id' : ownerId,
      }
    )
    .then(function(res) {
      console.log(res);
      setNowResult(res.data["now"]); // now:1
      setWaitResult(res.data["wait"]);
      setWillResult(res.data["will"]);
      setCompleteResult(res.data["complete"]);
    })
    .catch(function(err) {
      console.log(err)
    })
  }, []);

  console.log(nowResult);
  console.log(waitResult);
  console.log(willResult);
  console.log(completeResult);

  return (
    <div className="m-8">
      <h1 className="text-lg font-bold mb-3">입장대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="NOW"/> */}
        {nowResult.map((el, index) => (
          <OwnerPageCard
          mode="NOW"
          key={index}
          date={el.interview_date}
          name={el.worker_name}
          time={el.interview_time}
          description={el.question}
          />
        ))}
      </div>
      <h1 className="text-lg font-bold mb-3">승인대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WAIT"/> */}
        {waitResult.map((el, index) => (
          <OwnerPageCard
          mode="WAIT"
          key={index}
          date={el.interview_date}
          name={el.worker_name}
          time={el.interview_time}
          description={el.question}
          />
        ))}
      </div>
      <h1 className="text-lg font-bold mb-3">면접예정</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WILL"/> */}
        {willResult.map((el, index) => (
          <OwnerPageCard
          mode="WILL"
          key={index}
          date={el.interview_date}
          name={el.worker_name}
          time={el.interview_time}
          description={el.question}
          />
        ))}
      </div>
      <h1 className="text-lg font-bold mb-3">면접완료</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="COMPLETE"/> */}
        {completeResult.map((el, index) => (
          <OwnerPageCard
          mode="COMPLETE"
          key={index}
          date={el.interview_date}
          name={el.worker_name}
          time={el.interview_time}
          description={el.question}
          />
        ))}
      </div>
    </div>
  );
};

export default OwnerInterviewTimeTable;
