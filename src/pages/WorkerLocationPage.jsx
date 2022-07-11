import React from "react";
import { Link } from "react-router-dom";

const WorkerLocationPage = () => {
  return (
    <div>
      <h1>내 위치 설정</h1>
      <h2>위치를 설정해주세요</h2>
      <Link to="/worker/distance">다음</Link>
    </div>
  );
};

export default WorkerLocationPage;
