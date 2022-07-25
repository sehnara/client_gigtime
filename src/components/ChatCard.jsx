import React from "react";
import { useNavigate } from "react-router-dom";

function ChatCard( { caller, receiverName, lastChat, time, roomId} ) {
    const navigate = useNavigate();

    function toNextPage() {
        navigate("/chatroom", {
            state: {
                roomId: roomId,
                caller: caller,
                receiverName: receiverName
            }
        });
    };
    
    
    return (
        <div className="w-full h-20 rounded-xl shadow-lg shadow-black-500 p-4 border-2 mb-2" onClick={toNextPage}>
                    <div className="flex justify-between">
                        <p className="font-bold">{receiverName}</p>
                        {/* <p className="text-xs">{date}</p> */}
                    </div>
                    <div className="mt-2 flex justify-between">
                        <p className="text-xs">{lastChat}</p>
                        <p className="text-xs">{time}</p>
                    </div>
                </div>
    );
}

export default ChatCard;