import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-end space-x-4 pr-8 pt-4">
      <button onClick={() => navigate("/worker/nearWork")}>홈</button>
      <button onClick={() => navigate("/worker/home")}>면접신청</button>
      {/* <button onClick={()=>navigate('/worker/interview')}>면접신청</button> */}
      <button onClick={() => navigate("/worker/mypage")}>마이페이지</button>
    </div>
  );
};

export default NavBar;
