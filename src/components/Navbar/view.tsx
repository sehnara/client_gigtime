import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarProps from "./interface";

import { AiOutlineHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { FiZap } from "react-icons/fi";


const NavBar = ({ mode, angelUseState, isAngel }: NavBarProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex space-x-12 px-8 py-3 fixed bottom-0 bg-white shadow-xl shadow-inner items-center justify-center ">
      {mode === "WORKER" ? (
        <>
          <button
            onClick={() => {
              navigate("/worker/home");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <AiOutlineUsergroupAdd className="text-2xl" />
            <p className="text-xs">면접</p>
          </button>

          <button
            onClick={() => {
              navigate("/worker/nearWork");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <RiMoneyDollarCircleLine className="text-2xl" />
            <p className="text-xs">알바</p>
          </button>

          <button
            onClick={() => {
              navigate("/worker/qrCode");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <MdOutlineQrCodeScanner className="border-2 border-cyan-600 bg-cyan-500 p-3 w-16 h-16 rounded-full text-white absolute bottom-6 shadow-lg shadow-slate-300" />
            <p className="text-xs">출첵</p>
          </button>

          <button
            onClick={() => navigate("/worker/speed")}
            className="text-2xl flex flex-col items-center"
          >
            <FiZap className="text-2xl" />
            <p className="text-xs">추천</p>
          </button>

          <button
            onClick={() => {
              navigate("/chatlist");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <BsChatDots className="text-2xl" /> <p className="text-xs">채팅</p>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/owner/mypage");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <AiOutlineHome className="text-2xl" />
            <p className="text-xs">홈</p>
          </button>

          <button
            onClick={() => {
              navigate("/owner/recruit");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <AiOutlineUsergroupAdd className="text-2xl" />
            <p className="text-xs">모집</p>
          </button>

          <button
            onClick={() => {
              navigate("/owner/qrCode");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <MdOutlineQrCodeScanner className="border-2 border-cyan-600 bg-cyan-500 p-3 w-16 h-16 rounded-full text-white absolute bottom-6 shadow-lg shadow-slate-300" />
            <p className="text-xs">출첵</p>
          </button>

          <button
            onClick={() => {
              navigate("/owner/angel");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <FiZap className="text-2xl" />
            <p className="text-xs">천사</p>
          </button>
          
          <button
            onClick={() => {
              navigate("/chatlist");
            }}
            className="text-2xl flex flex-col items-center"
          >
            <BsChatDots className="text-2xl" /> <p className="text-xs">채팅</p>
          </button>
        </>
      )}
    </div>
  );
};

NavBar.defaultProps = {
  mode: "OWNER",
};

export default NavBar;
