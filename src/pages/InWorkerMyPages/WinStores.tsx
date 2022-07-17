import React, { useRef } from "react";
import StoreCard from "../../components/StoreCard";

const WinStores = () => {
  const ref = useRef(1);
  return (
    <div className="mx-8 my-4">
      <StoreCard
        key={ref.current}
        mode={"OWNER_MYPAGE"}
        store={"짜장짜장나라"}
        address={"죽도"}
        jobs={["반죽"]}
        works={["1", " 2", " 3", "4", "5"]}
        onDateClickEvent={() => {}}
      />
    </div>
  );
};

export default WinStores;
