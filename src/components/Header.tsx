import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

type HeaderProps = {
  title: string;
  worker?: boolean | string;
  onClickEvent?: string;
};

const Header = ({ title, onClickEvent, worker }: HeaderProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (onClickEvent === "NONE") {
      navigate(-1);
    } else {
      navigate(onClickEvent!);
    }
  };
  return (
    <div className="px-8 py-4 flex items-center justify-between bg-gray-100">
      <AiOutlineArrowLeft className="text-gray-600 text-xl" onClick={onClick} />
      <p className="text-center font-bold text-lg">{title}</p>
      {worker ? (
        <button onClick={() => navigate("/worker/mypage")}>
          <BiUserCircle className="text-2xl text-gray-500" />
        </button>
      ) : (
        <button onClick={() => navigate("/owner/mypage")}>
          <BiUserCircle className="text-2xl text-gray-500" />
        </button>
      )}
    </div>
  );
};

Header.defaultProps = {
  onClickEvent: "NONE",
};

export default Header;
