import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Buttons/Normal/view";
import dog from "../images/dog.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setOwnerEmail,
  setOwnerName,
} from "../../../module/slices/owner";
import axios from "axios";

function SignUpComplete() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(setOwnerName(state.sign.name));
    // dispatch(setOwnerEmail(state.sign.email));
  }, []);

  async function backgroundImageUpload(id:any) {
        // 해당 이미지 파일을 리덕스에 담고 CompletePage에서 진행해야할 것 같음.
        // let file = state.owner.background;
        // let data=  new FormData();
        // if (file) {
        //     data.append('background', file);
        // }

        // data.append('id', id);
        // await axios.post(`${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/imageUpload/background`, data).then((res) => {
        //     if (res.data.state === 'success') {
        //         console.log('good')
        //     }
        // });
        
    };

  async function onClickToRecruit() {
    // await axios
    //   .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/signup`, state.owner)
    //   .then(function (response) {
    //     if (response.data["result"] === "success") {
    //       sessionStorage.setItem("owner_id", response.data["owner_id"]);

    //       backgroundImageUpload(response.data["owner_id"]).then(()=>{navigate("/owner/recruit");});
    //     } 
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }


  async function onClickToHome() {
    // await axios
    //   .post(`${process.env.REACT_APP_ROUTE_PATH}/owner/signup`, state.owner)
    //   .then(function (response) {
    //     if (response.data["result"] === "success") {
    //       sessionStorage.setItem("owner_id", response.data["owner_id"]);
    //       backgroundImageUpload(response.data["owner_id"]).then(()=>{ navigate("/owner/mypage");});
         
    //     } 
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <div className="h-screen pt-40">
      <div className="m-8">
        <h2 className="text-3xl font-bold"><span className="text-cyan-500">바로알바</span>의</h2>
        <h2 className="text-3xl font-bold">가족이 되신것을</h2>
        <h2 className="text-3xl font-bold">환영합니다!</h2>
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

export default SignUpComplete;
