import React from "react";

function InputValue( {title, placeHorder, value, setValue} ) {
    return(
        <>
            <p className="text-xs font-bold text-slate-500 ml-1 mb-2">{title}</p>
            <div className="w-full rounded-lg border mb-4">
                <input 
                    className="w-full rounded-lg h-10 outline-gray-300 indent-2" 
                    placeholder={placeHorder}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </>
    );
}

export default InputValue;
