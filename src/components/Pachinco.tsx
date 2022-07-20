import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

type PachincoType = {
  moneys: number[];
  visits: any[];
  speed?: number;
  result?: {};
};

const Pachinco = ({ result, moneys, speed, visits }: PachincoType) => {
  // console.log("***********", moneys);

  const [prevMoney, setPrevMoney] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (sec >= moneys.length) {
      return;
    }

    const timeOut = setTimeout(() => {
      setPrevMoney(money);
      setMoney(moneys[sec]);
      setSec(sec + 1);
    }, speed);

    return () => {
      clearTimeout(timeOut);
    };
  }, [sec]);

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <p className="text-red-400 font-bold text-4xl animation-fade-in-down p-4">
        {sec === moneys.length
          ? `총 ${money - moneys[0]}원 증가`
          : `${money - prevMoney}원 증가`}
      </p>

      <div className="text-white text-6xl font-bold mb-16">{money}원</div>
      <div className="w-2/4">
        {sec === moneys.length ? (
          <Button
            title={"바로알바 신청"}
            onClickEvent={() =>
              navigate("/worker/speed/result", {
                state: { visits, totalPrice: money },
              })
            }
          />
        ) : (
          <Button
            title={"나가기"}
            onClickEvent={() => {
              console.log("dddddd");
            }}
          />
        )}
      </div>
    </div>
  );
};

Pachinco.defaultProps = {
  speed: 1000,
};

export default Pachinco;
