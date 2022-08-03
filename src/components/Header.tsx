import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type HeaderProps = {
  title: string;
  worker?: boolean | string;
  onClickEvent?: string;
  isSignUp?: boolean;
  isLast?: boolean;
  isFirst?: boolean;
};

const Header = ({
  title,
  onClickEvent,
  worker,
  isSignUp,
  isLast,
  isFirst,
}: HeaderProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (onClickEvent === "NONE") {
      navigate(-1);
    } else {
      navigate(onClickEvent!);
    }
  };
  return (
    <div className="px-4 py-4 flex items-center justify-between bg-white">
      {isFirst ? (
        <div className="w-4 h-4"></div>
      ) : (
        <AiOutlineArrowLeft
          className="text-gray-600 text-xl"
          onClick={onClick}
        />
      )}

      <p className="text-center font-bold text-lg">{title}</p>
      {isLast ? (
        <div className="h-4 w-4"></div>
      ) : worker ? (
        <button onClick={() => navigate("/worker/mypage")}>
          <BiUserCircle className="text-2xl text-gray-500" />
        </button>
      ) : isSignUp ? (
        <div>
          <AiOutlineQuestionCircle className="text-2xl text-gray-500" />
        </div>
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
  isLast: false,
  isFirst: false,
};

export default Header;
