import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import dog from "../images/dog.png";

function OwnerCompletePage() {
  const navigate = useNavigate();

  function onClickToNext() {
    navigate('/owner/recruit');
  }

  return (
    <div className="h-screen pt-40">
      <div className="m-8">
        <h2 className="text-3xl font-bold">
          <span className="text-cyan-500">긱</span>
          타임의
        </h2>
        <h2 className="text-3xl font-bold">가족이 되신것을</h2>
        <h2 className="text-3xl font-bold">환영합니다!</h2>
        <img
          width={200}
          className="transform translate-x-36 translate-y-14 "
          src={dog}
        />
      </div>
      <div className="ml-8 mr-8 pt-1">
        <Button title="모집공고 작성" onClickEvent={onClickToNext} />
        <button
          className="mt-2 font-bold w-full text-gray-500"
          onClick={() => navigate("/owner/mypage")}
          >
          홈으로
        </button>
      </div>
    </div>
  );
}

export default OwnerCompletePage;
