import React from "react";
import { FaRegComment } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";

type StoreCardProps = {
  store: string;
  distance: number;
  jobs: string[];
  minPay: number;
  storeImage?: string;
  ment?: string;
};

function StoreCard({
  store,
  distance,
  jobs,
  minPay,
  storeImage,
  ment,
}: StoreCardProps) {
  return (
    <>
      <div className="rounded-2xl shadow-black flex">
        <img src={storeImage} width="100px" height="100px" />
        <div>
          <h3 className="">{store}</h3>
          <p>{distance}m</p>
        </div>
      </div>
      <div>
        <div className="flex">
          <FaRegComment />
          <p>{ment}</p>
        </div>
        <div className="flex">
          <BsCoin />
          <p>시급 {minPay}~</p>
        </div>
      </div>
    </>
  );
}

StoreCard.defaultProps = {
  ment: "가족같은 분위기에서 즐겁게 일하실 분을 기다립니다!",
  storeImage: "../images/pica.jpg",
};

export default StoreCard;
