import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  title: string;
  onClickEvent?: string;
};

const Header = ({ title, onClickEvent }: HeaderProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (onClickEvent) {
      navigate(onClickEvent);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="mx-8 py-4 flex items-center">
      <AiOutlineArrowLeft className="" onClick={onClick} />
      <p className="text-center font-bold flex-10">{title}</p>
    </div>
  );
};

export default Header;
