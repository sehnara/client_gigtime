import React, { useRef } from "react";

type TabBarProps = {
  menu: string[];
  tab: string;
  setTab: (e: string) => void;
};

const TabBar = ({ menu, tab, setTab }: TabBarProps) => {
  const tabRef = useRef(1);
  const changeTab = (e: string) => {
    setTab(e);
  };
  return (
    <div className="flex space-x-2 border-b-2 justify-between items-center">
      {menu.map((e) => {
        tabRef.current += 1;
        return tab === e ? (
          <div
            key={tabRef.current}
            className="border-b-2 border-black font-bold px-6 py-2 "
          >
            {e}
          </div>
        ) : (
          <div
            key={tabRef.current}
            className="text-gray-400 px-6 py-2"
            onClick={() => changeTab(e)}
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
