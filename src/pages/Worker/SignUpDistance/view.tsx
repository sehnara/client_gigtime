import {useNavigate } from "react-router-dom";

import Button from "../../../components/Buttons/Normal/view";
import Header from "../../../components/Header/view";
import Map from "../../../components/Map/Map";

import axios from "axios";
import { useRecoilState } from "recoil";
import { SignUpWorkerState } from "../../../context/signUpWork";

const WorkerDistancePage = () => {
  const navigate = useNavigate();
  const [sign, setSign] = useRecoilState(SignUpWorkerState)

  const onChangeDistance = (e: any) => {
    setSign({...sign, distance : e.target.value})
  };

//   const setSignData = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/signup`, signData)
//       .then((res) => {
//         sessionStorage.setItem("worker_id", res.data);
//       })
//       .then(() => {
//         navigate("/worker/home");
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

  return (
    <div className="font-sans">
      <Header title="회원가입 "/>
      <div className=" m-8 ">
        <p className="text-sm ">거리를 설정해주세요</p>
        <p className="text-xs text-gray-500 mt-2">
          반경 <span className="font-extrabold">{sign.distance}m</span> 안에
          있는 일감 정보가 검색됩니다.
        </p>
        <input
          type="range"
          className="border-2 h-10 w-full"
          min={0}
          max={4000}
          step={100}
          value={sign.distance}
          onChange={(e)=>onChangeDistance(e)}
        />
        <Map
          level={8}
          width={"full"}
          height={"96"}
          address={'판교'}
          range={sign.distance}
        />
        <Button title={"완료"} onClickEvent={()=>{navigate("/worker/home")}} />
      </div>
    </div>
  );
};

export default WorkerDistancePage;
