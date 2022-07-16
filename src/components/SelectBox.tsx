import React, { useState } from "react";

type MODE = "NORMAL" | "RESERVE";

type SelectBoxProp = {
  data: any[];
  getData: (e: any) => void;
  mode?: MODE;
};

const SelectBox = ({ data, getData, mode }: SelectBoxProp) => {
  return (
    <div className=" shadow-lg shadow-slate-300 h-40 overflow-scroll rounded-md">
      {data.map((e) => {
        return (
          mode === "RESERVE" ? 
          <div
            onClick={() => getData(e.hourlyorders_id)}
            key={e.hourlyorders_id}
            className="rounded-sm text-center py-2 shadow-sm  mx-2 my-2 hover:bg-cyan-500 hover:text-white cursor-pointer text-sm"
          >
            {e.start_time}
          </div>
          :
          <div
            onClick={() => getData(e)}
            key={e}
            className="rounded-sm text-center py-2 shadow-sm  mx-2 my-2 hover:bg-cyan-500 hover:text-white cursor-pointer text-sm"
          >
            {e}
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
