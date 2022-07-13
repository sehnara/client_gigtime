import React from "react";
import { useNavigate } from "react-router-dom";

function JoinSelect({ src, title, text }) {
    const navigate = useNavigate();
    

    function clickToNextPage() {
        if (title === '사장님') {
            navigate('/owner/storename');
        } else {
            navigate('/worker/location');
        }
    }

    return (
        <div onClick={clickToNextPage} className="flex flex-col shadow-lg shadow-slate-300 h-60 overflow-scroll rounded-md justify-center items-center">
            <img className="h-16" src={src}></img>
            <p className="text-xl mt-3 font-bold">{title}</p>
            <p className="text-slate-500 mt-3 text-base text-center">{text}</p>
        </div>
    );
}

export default JoinSelect;