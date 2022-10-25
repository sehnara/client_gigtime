import { useState } from "react";
import ListProps from "./interface";
import Empty from "../../Empty/view";

import { AiOutlineCalendar } from "react-icons/ai";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { gettimeData } from "../../../services/date";

const RecruitList = ({
  date,
  type,
  datas,
  mode,
  store,
  address,
  price,
}: ListProps) => {
  const [isStretch, setIsStretch] = useState(false);
  const {year, month, day, yoil} = gettimeData(date)

  return (
    <div className="mb-8 ">
      {mode === "WORKER" ? (
        <div>
          <div className="flex space-x-2 items-center">
            {date == undefined ? (
              <Empty text={"예약한 일거리가 없습니다."} margin={4} />
            ) : (
              <div className="flex space-x-2">
                <AiOutlineCalendar />
                <p className="text-xs ">{`${year}년 ${month}월 ${day}일 ${yoil}요일`}</p>
              </div>
            )}
          </div>
          <div className="flex space-x-2 mt-4">
            <p className="font-bold text-xl">{store}</p>
          </div>
          <div className="flex mt-1 items-center justify-between text-cyan-500 font-bold mb-2">
            <p className="text-xs">{address}</p>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2 items-center">
          {date == undefined ? (
            <Empty text={"모집 내역이 없습니다."} margin={4} />
          ) : (
            <div className="flex space-x-2 items-center mb-1 justify-between w-full">
              <div className="flex space-x-2 items-center ">
                <AiOutlineCalendar className="text-sm" />
                <p className="text-sm font-bold">{`${year}년 ${month}월 ${day}일 ${yoil}요일`}</p>
              </div>
              {date !== undefined && (
                <p className="text-sm text-gray-500 pr-2">
                  총
                  <span className="text-cyan-500 font-bold text-sm">
                    {` ${datas.length}`}
                  </span>
                  시간
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {/* --------------------------------------------------------------------- */}
      <div
        className={`w-full  rounded-xl ${
          date === undefined ? "" : "shadow-xl"
        } pb-1`}
      >
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
                  <p className="py-2 w-1/3 text-center text-sm ">{`${e[0]}~${
                    e[0].split(":")[0] * 1 + 1
                  }:00`}</p>
                  <p className="py-2 w-1/3 text-sm text-center">{`${e[1]}원`}</p>
                  <p className="py-2 w-1/3 text-center font-bold  text-sm">
                    {e[2] === "null" ? (
                      <span className=" text-red-400 font-bold">매칭 전</span>
                    ) : (
                      <span className="font-bold text-blue-500">{e[2]}</span>
                    )}
                  </p>
                </div>
              );
            })
          : datas.map((e) => {
              if (datas.indexOf(e) < 3) {
                e = e.split(",");
                return mode === "WORKER" ? (
                  <div
                    key={e}
                    className="space-x-4 px-4 border-b-2 border-gray-100 "
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
                    <p className="py-2 w-1/3 text-center text-sm ">{`${e[0]}~${
                      e[0].split(":")[0] * 1 + 1
                    }:00`}</p>
                    <p className="py-2 w-1/3 text-sm text-center">{`${e[1]}원`}</p>
                    <p className="py-2 w-1/3 text-center font-bold  text-sm">
                      {e[2] === "null" ? (
                        <span className="font-bold text-red-400">매칭 전</span>
                      ) : (
                        <span className="font-bold text-blue-500">{e[2]}</span>
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
            {isStretch ? (
              <RiArrowUpSLine className="text-lg" />
            ) : (
              <RiArrowDownSLine className="text-lg" />
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

RecruitList.defaultProps = { mode: "OWNER" };
export default RecruitList;
