import React from "react";

type ButtonProps = {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  onClickEvent: () => void;
};

const Button = ({ title, color, width, height, onClickEvent }: ButtonProps) => {
  const onClick = () => {
    onClickEvent();
  };
  return (
    
      <button
        onClick={onClick}
        className={`text-base text-white bg-cyan-500 w-${width} rounded-lg font-extrabold h-12 mt-5`}
      >
        {title}
      </button>
    
  );
};

Button.defaultProps = {
  width: "full",
  height: 100,
};

export default Button;
