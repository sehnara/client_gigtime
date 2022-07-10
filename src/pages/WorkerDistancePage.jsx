import React from "react";
import { Link } from "react-router-dom";

const WorkerDistancePage = () => {
  return (
    <div>
      <h1>인천 서구 심곡동</h1>
      <h1>거리를 설정해주세요</h1>
      <Link to="/worker/home">설정완료</Link>
    </div>
  );
};

export default WorkerDistancePage;
