import React from "react";
import { positions } from ".";
import { useNavigate } from "react-router-dom";


function SignUpButton() {
  
  const navigate = useNavigate();
  function goNext(title: string):void {
    if (title === "사장님") {
      navigate("/owner/storename");
    } else {
      navigate("/worker/location");
    }
  }

  return (
    <div className="flex flex-col justify-around m-4 mt-8 ">
      {
        positions.map(e => {
          return(
          <div
            onClick={(e)=>{goNext(e.currentTarget.getElementsByTagName('p')[0].innerText)}}
            className={
              `${
              e.title === "사장님" 
              ? "bg-gray-100" 
              : "bg-cyan-100"
              } 
            flex flex-col shadow-lg shadow-slate-300 h-48 mb-12 overflow-scroll rounded-md justify-center items-center`}
          >
            <img className="h-16" src={e.src}></img>
            <p className="text-2xl  font-bold ">{e.title}</p>
            <p className="text-slate-500 mt-3 text-center text-xs">{e.text}</p>
          </div>)
        })
      }
      
    </div>
  );
}

export default SignUpButton;
