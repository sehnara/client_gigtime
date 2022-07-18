import React from "react";
import OwnerPageCard from "../../components/OwnerPageCard";
import { useEffect, useState } from "react";
import axios from "axios";

const OwnerInterviewTimeTable = () => {
  const [nowResult, setNowResult] = useState([]);
  const [waitResult, setWaitResult] = useState([]);
  const [willResult, setWillResult] = useState([]);
  const [completeResult, setCompleteResult] = useState([]);
  // 1.
  const [isClick, setIsClick] = useState(true);
  // 2. 버튼 클릭 시 axios 설정 => if(res.data === 'success') setIsClick(true)
  function onClickAllow(id) {
    axios.post('http://localhost:4000/owner/inteview/accept',
      {
        'interview_id' : id,
        'value': true
      }
    )
    .then(function (res) {
      if (res === 'success') {
        setIsClick(true);
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  function onClickReject(id) {
    axios.post('http://localhost:4000/owner/inteview/accept',
      {
        'interview_id' : id,
        'value': false
      }
    )
    .then(function (res) {
      if (res === 'success') {
        setIsClick(true);
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  function onClickPass(id) {
    axios.post('http://localhost:4000/owner/inteview/result',
      {
        'interview_id' : id,
        'value': true
      }
    )
    .then(function (res) {
      if (res === 'success') {
        setIsClick(true);
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  function onClickFail(id) {
    axios.post('http://localhost:4000/owner/inteview/result',
      {
        'interview_id' : id,
        'value': false
      }
    )
    .then(function (res) {
      if (res === 'success') {
        setIsClick(true);
      } else {
        console.log(res);
      }
    })
    .catch(function (err) {
      console.log(err);
    })
  }
  // 3. isClick을 useEffect [] 안에 넣어줌
  // 4. useEffect 끝에 false로 바꿔 줌

  useEffect(() => {
    const ownerId = sessionStorage.getItem("owner_id");
    axios
      .post("http://localhost:4000/owner/interview", {
        owner_id: ownerId,
      })
      .then(function (res) {
        console.log(res);
        setNowResult(res.data["now"]);
        setWaitResult(res.data["wait"]);
        setWillResult(res.data["will"]);
        setCompleteResult(res.data["complete"]);
      })
      .catch(function (err) {
        console.log(err);
      });
      setIsClick(false)
  }, [isClick]);

  // console.log(nowResult);
  // console.log(waitResult);
  // console.log(willResult);
  // console.log(completeResult);

  return (
    <div className="m-8">
      <h1 className="text-lg font-bold mb-3">입장대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="NOW"/> */}
        {nowResult && 
          nowResult.map((el) => (
          <OwnerPageCard
            mode="NOW"
            key={el.interview_id}
            date={el.interview_date}
            name={el.worker_name}
            time={el.interview_time}
            description={el.question}
            onClickAllow={onClickAllow(el.inteview_id)}
            onClickReject={onClickReject(el.inteview_id)}
          />
        ))}
      </div>
      <h1 className="text-lg font-bold mb-3">승인대기</h1>
      <div className="h-72 mb-5 rounded-xl overflow-scroll">
        {/* <OwnerPageCard mode="WAIT"/> */}
        {waitResult &&
          waitResult.map((el) => (
            <OwnerPageCard
              mode="WAIT"
              key={el.interview_id}
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
        {willResult &&
          willResult.map((el) => (
            <OwnerPageCard
              mode="WILL"
              key={el.interview_id}
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
        {completeResult &&
          completeResult.map((el) => (
            <OwnerPageCard
              mode="COMPLETE"
              key={el.interview_id}
              date={el.interview_date}
              name={el.worker_name}
              time={el.interview_time}
              description={el.question}
              onClickPass={onClickPass(el.interview_id)}
              onClickFail={onClickFail(el.interview_id)}
            />
          ))}
      </div>
    </div>
  );
};

export default OwnerInterviewTimeTable;
