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
    <div>
      <button
        onClick={onClick}
        className="text-base text-white bg-cyan-500 w-full rounded-lg font-extrabold h-12"
      >
        {title}
      </button>
    </div>
  );
};

Button.defaultProps = {
  width: 100,
  height: 100,
  color: "red",
};

export default Button;
