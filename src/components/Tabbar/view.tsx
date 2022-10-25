import { useRef } from "react";
import TabBarProps from "./interface";

const TabBar = 
    ({ menu, tab, setTab, ScrollActive }: TabBarProps) => 
{
  const tabRef = useRef(1);
  
  return (
    <div className={ScrollActive ? "flex space-x-2 border-b-2 justify-between items-center bg-white top-0 fixed w-full" : "flex space-x-2 border-b-2 justify-between items-center bg-white"}>
      {menu.map((e) => {
        tabRef.current += 1;
        return tab === e 
        ? (
          <div
            key={tabRef.current}
            className="border-b-2 border-black font-bold px-6 py-2 "
          >
            {e}
          </div>
        ) 
        : (
          <div
            key={tabRef.current}
            className="text-gray-400 px-6 py-2"
            onClick={() => setTab(e)}
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
