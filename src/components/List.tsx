import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

type MODE = "WORKER" | "OWNER";

type ListProps = {
  date: string;
  type: string;
  datas: any[];
  mode: MODE;
  store?: string;
  address?: string;
  price?: string;
};

const List = ({
  date,
  type,
  datas,
  mode,
  store,
  address,
  price,
}: ListProps) => {
  const [isStretch, setIsStretch] = useState(false);

  //   날짜 관련
  const time = new Date(date);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const yoil =
    time.getDay() === 1
      ? "월"
      : time.getDay() === 2
      ? "화"
      : time.getDay() === 3
      ? "수"
      : time.getDay() === 4
      ? "목"
      : time.getDay() === 5
      ? "금"
      : time.getDay() === 6
      ? "토"
      : "일";

  return (
    <div className="mb-8">
      {mode === "WORKER" ? (
        <div>
          <div className="flex space-x-2 items-center">
            <AiOutlineCalendar />
            <p className="text-xs ">{`${year}년 ${month}월 ${day}일 ${yoil}요일`}</p>
          </div>
          <div className="flex space-x-2 mt-4">
            <p className="font-bold">{store}</p>
            <p className="text-xs bg-gray-100 px-2 py-1 rounded-2xl">{type}</p>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="text-xs">{address}</p>
            <p className=" text-lg font-bold">총 {price}원</p>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2 items-center">
          <AiOutlineCalendar />
          <p className="text-xs ">{`${year}년 ${month}월 ${day}일 ${yoil}요일`}</p>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded-2xl">
            {type}
          </div>
        </div>
      )}
      {/* --------------------------------------------------------------------- */}
      <div className="w-full  rounded-xl shadow-xl pb-1">
        {mode === "WORKER" ? (
          ""
        ) : (
          <p className="absolute transform translate-x-72 translate-y-5 text-xs text-gray-500">
            {`총 ${datas.length}시간`}
          </p>
        )}
        {mode === "WORKER" ? (
          ""
        ) : (
          <p className="text-center pt-4 text-lg font-bold pb-2">{type}</p>
        )}
        {isStretch
          ? datas.map((e) => {
              e = e.split(",");
              return mode === "WORKER" ? (
                <div
                  key={e}
                  className="space-x-4 px-4 border-b-2 border-gray-100"
                >
                  <p className="py-2 text-center text-sm">{`${e[0]}~${
                    e[0].split(":")[0] * 1 + 1
                  }:00`}</p>
                </div>
              ) : (
                <div
                  key={e}
                  className="flex justify-between space-x-4 px-4 border-b-2 border-gray-100 "
                >
                  <p className="py-2 w-1/3 text-center text-xs ">{`${e[0]}~${
                    e[0].split(":")[0] * 1 + 1
                  }:00`}</p>
                  <p className="py-2 w-1/3 text-xs text-center">{`${e[1]}원`}</p>
                  <p className="py-2 w-1/3 text-center font-bold  text-sm">
                    {e[2] === "" ? (
                      <span className="font-light">매칭 전</span>
                    ) : (
                      e[2]
                    )}
                  </p>
                </div>
              );
            })
          : datas.map((e) => {
              // console.log(datas.indexOf(e));
              if (datas.indexOf(e) < 3) {
                e = e.split(",");
                return mode === "WORKER" ? (
                  <div
                    key={e}
                    className="space-x-4 px-4 border-b-2 border-gray-100"
                  >
                    <p className="py-2 text-center text-sm">{`${e[0]}~${
                      e[0].split(":")[0] * 1 + 1
                    }:00`}</p>
                  </div>
                ) : (
                  <div
                    key={e}
                    className="flex justify-between space-x-4 px-4 border-b-2 border-gray-100 "
                  >
                    <p className="py-2 w-1/3 text-center text-xs ">{`${e[0]}~${
                      e[0].split(":")[0] * 1 + 1
                    }:00`}</p>
                    <p className="py-2 w-1/3 text-xs text-center">{`${e[1]}원`}</p>
                    <p className="py-2 w-1/3 text-center font-bold  text-sm">
                      {e[2] === "" ? (
                        <span className="font-light">매칭 전</span>
                      ) : (
                        e[2]
                      )}
                    </p>
                  </div>
                );
              }
            })}
        {datas.length > 3 ? (
          <button
            className="w-full p-2 text-gray-500 flex justify-center  space-x-2 items-center"
            onClick={() => {
              setIsStretch(!isStretch);
            }}
          >
            <p>더보기</p>
            {isStretch ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

List.defaultProps = { mode: "OWNER" };

export default List;
