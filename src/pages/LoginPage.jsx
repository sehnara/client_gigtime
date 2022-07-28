import React from "react";
import Header from "../components/Header";
import JoinSelect from "../components/JoinSelect";
import owner from "../images/owner.png";
import worker from "../images/worker.png";

const LoginPage = () => {
  const arr = [
    {
      key: 1,
      title: "사장님",
      text: "알바 구하기가 하늘의 별따기라면, 지금 바로 Go!",
      src: `${owner}`,
    },
    {
      key: 2,
      title: "알바생",
      text: "집 근처 매장에서 쉽고 빠르게 알바 하려면 바로 Go!",
      src: `${worker}`,
    },
  ];
  return (
    <div className="font-sans h-screen">
      <Header title="회원가입" isSignUp={true} />
      <div className="m-8 mt-10 h-full">
        <p className="text-lg mb-2 font-bold">가입유형 선택</p>
        <div className="flex flex-col h-5/6 justify-around">
          {arr.map((el) => {
            return (
              <JoinSelect
                key={el.key}
                title={el.title}
                text={el.text}
                src={el.src}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
