import React, { useState } from "react";

type MODE = "NORMAL" | "RESERVE" | "TIME";

type SelectBoxProp = {
  data: any[];
  getData: (e: any, e2?: any) => void;
  mode?: MODE;
  selectedDate?: string[];
  selectedDay?: string | null;
  selectedTime?: string | null;
  setMoney?: () => void;
  money?: [];
};

const SelectBox = ({
  selectedDay,
  selectedDate,
  selectedTime,
  data,
  getData,
  mode,
}: SelectBoxProp) => {
  return (
    <div className="shadow-lg shadow-slate-300 h-40 overflow-scroll rounded-md ">
      {data.map((e) => {
        return mode === "RESERVE" ? (
          <div
            onClick={() => {
              getData(e.hourlyorders_id, e);
            }}
            key={e.hourlyorders_id}
            className={`p-2 px-8 rounded-sm text-center shadow-sm   cursor-pointer text-sm items-center ${
              selectedDate!.includes(e.hourlyorders_id)
                ? "text-white bg-cyan-500"
                : "text-black bg-white"
            } flex justify-between`}
          >
            <p>{`${e.start_time.split("T")[1].split(":")[0]}:${
              e.start_time.split("T")[1].split(":")[1]
            } ~ ${
              Number(e.start_time.split("T")[1].split(":")[0]) + 1 < 10
                ? "0" + (Number(e.start_time.split("T")[1].split(":")[0]) + 1)
                : Number(e.start_time.split("T")[1].split(":")[0]) + 1
            }:${e.start_time.split("T")[1].split(":")[1]}`}</p>
            <p>
              <span className="font-bold text-lg  ">{e.min_price}</span>
              <span className="text-xs">원</span>
            </p>
          </div>
        ) : (
          <div
            onClick={() => getData(e)}
            key={e}
            className={`rounded-sm text-center  shadow-sm  px-2 py-2 ${
              selectedDay === e || selectedTime === e
                ? "bg-cyan-500 text-white"
                : ""
            } cursor-pointer text-sm`}
          >
            {mode === "TIME" ? e + "시" : e}
          </div>
        );
      })}
    </div>
  );
};

SelectBox.defaultProps = {
  mode: "NORMAL",
};
export default SelectBox;
