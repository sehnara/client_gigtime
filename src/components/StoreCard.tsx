import React, { useReducer, useRef } from "react";
import { FaRegComment } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";

type MODE = "NORMAL" | "NEAR";
//type WORK = {
//  date: string;
//  jobs: string;
//  pay: string;
//};

type StoreCardProps = {
  store: string;
  distance: number;
  jobs?: string[];
  minPay: number;
  storeImage?: string;
  ment?: string;
  mode: MODE;
  works?: string[];
  onClickEvent?: () => void;
  onDateClickEvent?: (e:any) => void;
};


/* ~~~Z 형식의 String date를 인자로 넣으면 2022-08-11 형식의 String 반환 */
function masage_date(date_timestamp:any) {
  let date = new Date(date_timestamp);
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length === 1)
      month = '0' + month;

  if (day.length === 1)
      day = '0' + day;

  return (year + '년 ' + month + '월' + day + '일');
}


function StoreCard({
  store,
  distance,
  jobs,
  minPay,
  storeImage,
  ment,
  mode,
  works,
  onClickEvent,
  onDateClickEvent,
}: StoreCardProps) {
  const ref = useRef(1);
  function onWorkReserve(orderId:any){
    onDateClickEvent!(orderId!);
  }

  return (
    <div className="mb-4" onClick={onClickEvent}>
      {/* 상단부 */}
      <div className="rounded-2xl shadow-black flex ">
        {/* 사진 */}
        {storeImage === "" ? (
          <div className="w-24 h-24 rounded-xl bg-slate-300 mr-4"></div>
        ) : (
          <img src={storeImage} />
        )}

        <div>
          {/* 가게명 */}
          {mode === "NEAR" ? (
            <div className="flex items-center ">
              <h3 className="mt-2 font-bold ">{store}</h3>
              <p className="text-gray-400 text-xs mt-3 ml-3">총 {works && works.length}건</p>
            </div>
          ) : (
            <h3 className="mt-2 font-bold ">{store}</h3>
          )}

          {/* 거리 */}
          <p className="mt-1">{distance}m</p>
          {/* 직종 */}
          <div className="flex space-x-2 mt-2">
            {jobs && jobs.map((e) => {
              return (
                <div
                  key={e}
                  className="text-xs bg-gray-200 rounded-3xl px-2 py-1"
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 하단부 */}
      {mode === "NEAR" ? (
        <div className="flex overflow-scroll p-2 w-">
          {works && works.map((e) => {
            ref.current += 1;
            return (
              <div
                key={ref.current}
                className="mt-2 p-4 shadow-lg rounded-lg"
                onClick={()=>onWorkReserve({id : e[2], date : e[0], type : e[1]})}
              >
                {/* 시급 */}
                <div className='flex items-center justify-between'>
                  <div className="flex items-center mt-2 w-36 mb-2">
                    <BsCoin className="mr-2" />
                    <p className="text-xs">
                      시급 <span className="font-bold">{minPay}</span>
                    </p>
                  </div>
                  <div
                    key={e}
                    className="text-xs bg-gray-200 rounded-3xl px-2 py-1"
                  >
                    {e[1]}
                </div>
                </div>
                {/* 날짜 */}
                <div className="flex items-center w-52">
                  <AiOutlineCalendar className="mr-2" />
                  <p className="text-xs">{masage_date(e[0])}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 p-4 shadow-lg rounded-lg">
          {/* 사장님 멘트 */}
          <div className="flex items-center">
            <FaRegComment className="mr-2" />
            <p className="text-xs">{ment}</p>
          </div>
          {/* 시급 */}
          <div className="flex items-center mt-2">
            <BsCoin className="mr-2" />
            <p className="text-xs">
              시급 <span className="font-bold">{minPay}</span> ~
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

StoreCard.defaultProps = {
  ment: "즐겁게 일하실 분 기다립니다!",
  storeImage: "",
  mode: "NORMAL",
};

export default StoreCard;
