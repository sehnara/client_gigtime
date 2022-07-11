import React from "react";
type SelectBoxProp = {
  data: string[];
  getData: (e: any) => void;
};

const SelectBox = ({ data, getData }: SelectBoxProp) => {
  return (
    <div className=" shadow-lg shadow-slate-300 h-40 overflow-scroll rounded-md">
      {data.map((e) => {
        return (
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

export default SelectBox;
