import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import dog from "../images/dog.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOwnerEmail, setOwnerName } from "../module/slices/owner";
import axios from "axios";

function OwnerCompletePage() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOwnerName(state.sign.name));
    dispatch(setOwnerEmail(state.sign.email));
  }, []);

  async function onClickToRecruit() {
    await axios.post("http://localhost:4000/owner/signup", 
      state.owner
    )
    .then(function (response) {
      if (response === "success") {
        navigate("/owner/recruit");
      } else {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async function onClickToHome() {
    await axios.post("http://localhost:4000/owner/signup", 
      state.owner
    )
    .then(function (response) {
      if (response === "success") {
        navigate("/owner/mypage");
      } else {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
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
        <Button title="모집공고 작성" onClickEvent={onClickToRecruit} />
        <button
          className="mt-2 font-bold w-full text-gray-500"
          onClick={onClickToHome}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

export default OwnerCompletePage;
