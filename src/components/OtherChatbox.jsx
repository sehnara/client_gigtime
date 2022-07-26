import React from "react";

function OtherChatbox( { messageContent } ) {
    return(
        <div className="h-auto p-3 flex">
            <div className="w-40">
                <div className="w-auto h-auto min-h-[40px] max-w-full bg-gray-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                    <p>{messageContent.message}</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold text-sm">{messageContent.caller_name}</p>
                    <p className="text-xs">{messageContent.createdAt}</p>
                </div>
            </div>
        </div>
    );
}

export default OtherChatbox;