import React, { useState } from "react";

type MODE = "NORMAL" | "RESERVE" | "TIME";


type SelectBoxProp = {
  data: any[];
  getData: (e: any) => void;
  mode?: MODE;
  selectedDate? : string[]
};

const SelectBox = ({ selectedDate, data, getData, mode }: SelectBoxProp) => {
  console.log(data)
  return (
    <div className="shadow-lg shadow-slate-300 h-40 overflow-scroll rounded-md">
      {data.map((e) => {
        return (
          mode === "RESERVE" ? 
          <div
            onClick={() => getData(e.hourlyorders_id)}
            key={e.hourlyorders_id}
            className={`rounded-sm text-center py-2 shadow-sm  mx-2 my-2 hover:bg-cyan-500 hover:text-white cursor-pointer text-sm ${selectedDate!.includes(e) ? 'text-white bg-cyan-500' : '' } flex px-4 justify-between`}
          >
            <p>{`${e.start_time.split("T")[1].split(":")[0]}:${e.start_time.split("T")[1].split(":")[1]}~${Number(e.start_time.split("T")[1].split(":")[0])+1 < 10 ? '0'+(Number(e.start_time.split("T")[1].split(":")[0])+1) : Number(e.start_time.split("T")[1].split(":")[0])+1}:${e.start_time.split("T")[1].split(":")[1]}`}</p>
            <p>{e.min_price}원<span className="text-xs"> /시간</span></p>
          </div>
          :
          <div
            onClick={() => getData(e)}
            key={e}
            className="rounded-sm text-center py-2 shadow-sm  mx-2 my-2 hover:bg-cyan-500 hover:text-white cursor-pointer text-sm"
          >
            {mode === "TIME" ? e+'시' : e}
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
