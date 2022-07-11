import React from "react";

type ButtonProps = {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  onClickEvent: () => {};
};

const Button = ({ title, color, width, height, onClickEvent }: ButtonProps) => {
  const onClick = () => {
    onClickEvent();
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="text-xs text-white bg-cyan-500 w-full h-10 rounded-lg font-extrabold"
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
