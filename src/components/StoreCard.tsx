import React, { useReducer, useRef, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";

type MODE = "NORMAL" | "NEAR" | "OWNER_MYPAGE" | "WIN";

type StoreCardProps = {
  store: string;
  distance?: number;
  jobs?: string[];
  minPay?: number;
  storeImage?: string;
  ment?: string;
  mode: MODE;
  works?: string[];
  address?: string;
  onClickEvent?: () => void;
  onDateClickEvent?: (e: any) => void;
};

/* ~~~Z 형식의 String date를 인자로 넣으면 2022-08-11 형식의 String 반환 */
function masage_date(date_timestamp: any) {
  let date = new Date(date_timestamp);
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (month.length === 1) month = "0" + month;

  if (day.length === 1) day = "0" + day;

  return year + "년 " + month + "월 " + day + "일";
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
  address,
  onClickEvent,
  onDateClickEvent,
}: StoreCardProps) {
  function onWorkReserve(orderId: any) {
    onDateClickEvent!(orderId!);
  }

  const [isStretch, setStretch] = useState(false);
  const [guns, setGuns] = useState(works?.slice(0, 5));
  let prevGuns = 5;
  let nextGuns = 10;

  return (
    <div
      className={`${mode === "WIN" ? "m-4" : "mb-6"} `}
      onClick={onClickEvent}
    >
      {/* 상단부 */}
      <div
        className={`rounded-lg flex ${mode === "WIN" ? "" : "p-2"} bg-white`}
      >
        {/* 사진 */}
        {storeImage === "" ? (
          <div className="w-16 h-16 rounded-lg bg-slate-300 mr-4"></div>
        ) : (
          <img
            className="object-cover w-16 h-16 rounded-lg mr-4"
            src={storeImage}
          />
        )}

        <div>
          {/* 가게명 */}
          {mode === "NEAR" ? (
            <div className="flex items-center ">
              <h3 className="mt-2 font-bold truncate ">{store}</h3>
            </div>
          ) : (
            <h3
              className={`${
                mode === "WIN" ? "" : "mt-2"
              } font-bold  truncate w-52`}
            >
              {store}
            </h3>
          )}
          {/* 거리 */}
          {mode === "WIN" && (
            <p className=" truncate w-48 text-red-400 font-bold text-xs">
              {address}
            </p>
          )}

          <div className="flex items-center mt-1">
            {/* 직종 */}
            <div className="flex space-x-2 truncate  overflow-sroll ">
              {jobs &&
                jobs.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs bg-gray-200 rounded-3xl px-2 py-1 "
                    >
                      {e}
                    </div>
                  );
                })}
            </div>

            <p className=" truncate w-48 text-red-400 font-bold ">
              {mode === "OWNER_MYPAGE"
                ? `${address}`
                : mode === "WIN"
                ? ""
                : `${distance}m`}
            </p>
          </div>
        </div>
      </div>

      {/* 하단부 */}
      {mode === "OWNER_MYPAGE" || mode === "WIN" ? (
        ""
      ) : mode === "NEAR" ? (
        <div className="pb-2 w-full">
          {works &&
            (works.length >= 2 ? (
              // 일감이 2개 이상
              //  펼쳤을 때
              isStretch ? (
                <div>
                  {works.map((e, index) => {
                    return (
                      <div
                        key={index}
                        className="mt-0.5 p-2 shadow-lg rounded-lg bg-white border-2"
                        onClick={(i) => {
                          onWorkReserve({ id: e[2], date: e[0], type: e[1] });
                        }}
                      >
                        {/* 시급 */}
                        <div className="flex items-center">
                          <AiOutlineMessage />
                          <div className="text-sm rounded-lg px-2 ">
                            <span className="font-bold">{store}</span>에서{" "}
                            <span className="font-bold">'{e[1]}'</span>구함
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mt-1 w-36 mb-1">
                            <BsCoin className="mr-2  text-xs" />
                            <p className="text-sm">
                              시급 <span className="font-bold">{minPay}</span>원
                            </p>
                          </div>
                        </div>
                        {/* 날짜 */}
                        <div className="flex justify-between">
                          <div className="flex items-center w-52">
                            <AiOutlineCalendar className="mr-2 text-xs" />
                            <p className="text-sm">{masage_date(e[0])}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="w-full flex justify-center bg-white border-2 mt-0.5 rounded-b-xl text-sm text-gray-500"
                    onClick={() => {
                      setStretch(!isStretch);
                    }}
                  >
                    간략하게 보기
                  </button>
                </div>
              ) : (
                //  접었을 때
                <div>
                  {[works[0]].map((e, index) => {
                    return (
                      <div
                        key={index}
                        className="mt-0.5 p-2 shadow-lg rounded-lg bg-white border-2"
                        onClick={(i) => {
                          onWorkReserve({ id: e[2], date: e[0], type: e[1] });
                        }}
                      >
                        {/* 시급 */}
                        <div className="flex items-center">
                          <AiOutlineMessage />
                          <div className="text-sm rounded-lg px-2   ">
                            <span className="font-bold">{store}</span>에서{" "}
                            <span className="font-bold">'{e[1]}'</span>구함
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center mt-1 w-36 mb-1">
                            <BsCoin className="mr-2  text-xs" />
                            <p className="text-sm">
                              시급 <span className="font-bold">{minPay}</span>원
                            </p>
                          </div>
                        </div>
                        {/* 날짜 */}
                        <div className="flex justify-between">
                          <div className="flex items-center w-52">
                            <AiOutlineCalendar className="mr-2 text-xs" />
                            <p className="text-sm">{masage_date(e[0])}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="w-full flex justify-center bg-white border-2 mt-0.5 rounded-b-xl text-sm text-gray-500"
                    onClick={() => {
                      setStretch(!isStretch);
                    }}
                  >
                    더보기
                  </button>
                </div>
              )
            ) : (
              works.map((e, index) => {
                // 일감이 하나일 때!
                return (
                  <div
                    key={index}
                    className="mt-1 p-2 shadow-lg rounded-lg bg-white border-2"
                    onClick={(i) => {
                      console.log(i.currentTarget.tagName === "BUTTON");
                      onWorkReserve({ id: e[2], date: e[0], type: e[1] });
                    }}
                  >
                    {/* 시급 */}
                    <div className="flex items-center">
                      <AiOutlineMessage />
                      <div className="text-sm rounded-lg px-2   ">
                        <span className="font-bold">{store}</span>에서{" "}
                        <span className="font-bold">'{e[1]}'</span>구함
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center mt-1 w-36 mb-1">
                        <BsCoin className="mr-2  text-xs" />
                        <p className="text-sm">
                          시급 <span className="font-bold">{minPay}</span>원
                        </p>
                      </div>
                    </div>
                    {/* 날짜 */}
                    <div className="flex justify-between">
                      <div className="flex items-center w-52">
                        <AiOutlineCalendar className="mr-2 text-xs" />
                        <p className="text-sm">{masage_date(e[0])}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ))}
        </div>
      ) : (
        <div className="mt-1 p-4 py-2 shadow-lg rounded-lg border-2 border-gray-300 bg-white">
          {/* 시급 */}
          <div className="flex items-center ">
            <BsCoin className="mr-2 text-xs" />
            <p className="text-sm">
              시급 <span className="font-bold text-base">{minPay}</span>원
            </p>
          </div>
          {/* 사장님 멘트 */}
          <div className="flex items-center mt-1">
            <FaRegComment className="mr-2 text-xs" />
            <p className="text-sm w-72 truncate">{ment}</p>
          </div>
        </div>
      )}
      {mode === "WIN" && <div className="mt-4 border-2"></div>}
    </div>
  );
}

StoreCard.defaultProps = {
  ment: "즐겁게 일하실 분 기다립니다!",
  storeImage: "",
  mode: "NORMAL",
};

export default StoreCard;
