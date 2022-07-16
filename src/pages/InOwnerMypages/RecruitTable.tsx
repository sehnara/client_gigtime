import React, { useRef } from "react";
import List from "../../components/List";

const mock = ["2022-07-16,카운터", "2022-07-16,서빙"];
const mockDict = {
  "2022-07-16,카운터": [
    ["10:00", 10400, "kantWang"],
    ["11:00", 10400, "kantWang"],
    ["12:00", 10400, "kantWang"],
    ["13:00", 10400, ""],
    ["14:00", 10400, "kantWang"],
  ],
  "2022-07-16,서빙": [
    ["16:00", 10400, "kantWang"],
    ["17:00", 10400, "kantWang"],
    ["19:00", 10400, "kantWang"],
    ["20:00", 10400, ""],
    ["21:00", 10400, "kantWang"],
    ["22:00", 10400, "kantWang"],
  ],
};

const RecruitTable = () => {
  const keyRef = useRef(1);
  return (
    <div className="m-4">
      {mock.map((e) => {
        keyRef.current += 1;
        return (
          <List
            key={keyRef.current}
            date={e.split(",")[0]}
            type={e.split(",")[1]}
            datas={mockDict["2022-07-16,서빙"]}
          />
        );
      })}
    </div>
  );
};

export default RecruitTable;
