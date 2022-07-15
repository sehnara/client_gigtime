import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

type SelectButtonProps = {
  label: string;
  margin_bottom: number;
  content: string;
};

const SelectButton = ({ label, margin_bottom, content }: SelectButtonProps) => {
  return (
    <div className={`mb-${margin_bottom}`}>
      <p className="text-sm font-bold mb-1">{label}</p>
      <button className="px-2 w-full rounded-lg border border-gray-400 h-10 flex items-center justify-between ">
        <p className="text-left text-gray-400">{content}</p>
        <MdArrowForwardIos className="text-gray-400" />
      </button>
    </div>
  );
};

SelectButton.defaultProps = {
  content: "",
  margin_bottom: 4,
};

export default SelectButton;
