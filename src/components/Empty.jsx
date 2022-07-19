import React from "react";
import dogHeart from "../images/dog_heart.png"

function Empty() {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <img className="w-52" src={dogHeart} />
            <h1 className="font-oxanium text-3xl">not yet!</h1>
        </div>
    );
}

export default Empty;