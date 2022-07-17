import React from "react";
import man from "../images/man.png"

function GigWorker( {bottomBorder, name} ) {
    return (
        <div className={`flex items-center ${bottomBorder} border-gray-100`}>
            <img className="m-2 w-5 h-5" src={man}/>
            <p className="text-xs">{name}</p>
        </div>
    );
}

export default GigWorker;