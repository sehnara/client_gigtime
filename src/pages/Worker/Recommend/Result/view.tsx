import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { BiTimeFive } from "react-icons/bi";
import { RiPinDistanceLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";

import Button from "../../../../components/Buttons/Normal/view";
import Header from "../../../../components/Header/view";
import MapRoute from "../../../../components/Map/MapRoute";


const WorkerSpeedResultPage = () => {
  const navigate = useNavigate();
  const location  = useLocation();
  const result = location.state.result;
  const loc = location.state.visits;
  const totalPrice = location.state.totalPrice;

  function setStarts(arr:any[]) {
    const starts = [0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].store !== arr[i - 1].store) {
        starts.push(i);
      }
    }
    return starts;
  }

  function getDurations(arr:any[]) {
    const durations = [];
    let time = 0;
    for (let i = 1; i < arr.length; i++) {
      time += 1;
      if (arr[i].store !== arr[i - 1].store) {
        durations.push(time);
        time = 0;
      }
      if (i === arr.length - 1) {
        durations.push(time);
      }
    }
    durations[durations.length - 1] += 1;
    return durations;
  }

//   const onReserve = async () => {
//     await axios
//       .post(`${process.env.REACT_APP_ROUTE_PATH}/worker/suggestion/submit`, {
//         worker_id: sessionStorage.getItem("worker_id"),
//         hourly_order_id: loc.map((i) => i.id),
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .then(() => {
//         navigate("/worker/home");
//       });
//   };

  return (
    <div className="h-full w-full">
      <Header title={"바로알바 신청하기"} />
      <MapRoute
        locations={setStarts(loc).map((i) => loc[i])}
        durations={getDurations(loc)}
      />
      <div className="mx-8 flex flex-col items-end">
        <div className=" flex  flex-col  w-36 ">
          <p className="text-xl font-bold flex items-center ">
            <BiTimeFive className="mr-4 flex-1" />
            <div className="flex-3">
              <span className="text-red-400 text-xl ">{loc.length}</span>
              시간
            </div>
          </p>
          <p className="text-xl font-bold flex items-center ">
            <RiPinDistanceLine className="mr-4 flex-1" />
            <div className="flex-3">
              <span className="text-red-400 text-xl flex-3">{result.move}</span>
              m
            </div>
          </p>
          <p className="text-xl font-bold  flex items-center ">
            <GiReceiveMoney className="mr-4 flex-1" />
            <div className="flex-3">
              <span className="text-red-400 text-xl flex-3">{totalPrice}</span>
              원
            </div>
          </p>
        </div>

        <Button
          title={"신청하기"}
          onClickEvent={() => {
            // onReserve();
            navigate("/worker/home");
          }}
        />
      </div>
    </div>
  );
};

export default WorkerSpeedResultPage;
