import React from "react";

type CardButtonProps = {
  title: string;
  color?: string;
  width?: number;
  height?: number;
  onClickEvent: () => void;
};

const CardButton = ({ title, color, width, height, onClickEvent }: CardButtonProps) => {
  const onClick = () => {
    onClickEvent();
  };
  return (
    
      <button
        onClick={onClick}
        className={`text-base text-white ${color} w-${width} rounded-lg font-extrabold h-${height} mt-3 m-1`}
      >
        {title}
      </button>
    
  );
};

CardButton.defaultProps = {
  width: "full",
  height: 100,
};

export default CardButton;
