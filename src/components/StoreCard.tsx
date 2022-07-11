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
    <div className="">
      {/* 상단부 */}
      <div className="rounded-2xl shadow-black flex ">
        {/* 사진 */}
        {storeImage === "" ? (
          <div className="w-24 h-24 rounded-xl bg-slate-300 mr-4"></div>
        ) : (
          <img src={storeImage} />
        )}

        <div>
          {/* 가게명 */}
          <h3 className="mt-2 font-bold ">{store}</h3>
          {/* 거리 */}
          <p className="mt-1">{distance}m</p>
          {/* 직종 */}
          <div className="flex space-x-2 mt-2">
            {jobs.map((e) => {
              return (
                <div
                  key={e}
                  className="text-xs bg-gray-200 rounded-3xl px-2 py-1"
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 하단부 */}
      <div className="mt-2 p-4 shadow-lg rounded-lg">
        {/* 사장님 멘트 */}
        <div className="flex items-center">
          <FaRegComment className="mr-2" />
          <p className="text-xs">{ment}</p>
        </div>
        {/* 시급 */}
        <div className="flex items-center mt-2">
          <BsCoin className="mr-2" />
          <p className="text-xs">
            시급 <span className="font-bold">{minPay}</span> ~
          </p>
        </div>
      </div>
    </div>
  );
}

StoreCard.defaultProps = {
  ment: "즐겁게 일하실 분 기다립니다!",
  storeImage: "",
};

export default StoreCard;
