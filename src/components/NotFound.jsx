import React from "react";

function NotFound( {title} ) {
    return (
        <div className="h-full flex flex-col items-center justify-center">
                <p className="font-bold text-2xl">{title}</p>
                <p>🤗</p>
        </div>
    );
}

export default NotFound;