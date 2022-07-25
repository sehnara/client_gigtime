import React, { useState } from "react";
import Header from "../components/Header";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ChatRoomPage( { socket } ) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const location = useLocation();
    const receiverName = location.state.receiverName

    const sendMessage = async () => {
        if (currentMessage !== "") {
            if (sessionStorage.getItem("worker_id")) {
                setUserType("worker");
                setUserId(sessionStorage.getItem("worker_id"));
            } else {
                setUserType("owner");
                setUserId(sessionStorage.getItem("owner_id"));
            }
            const roomId = location.state.roomId;
            const caller = location.state.caller;
            
            const year = new Date(Date.now()).getFullYear();
            let month = (new Date(Date.now()).getMonth() + 1);
            let date = new Date(Date.now()).getDate();
            let hours = new Date(Date.now()).getHours();
            let minutes = new Date(Date.now()).getMinutes();
            
            if (month.toString().length === 1) {
                month = "0" + month;
            }
            if (date.toString().length === 1) {
                date = "0" + date;
            }
            if (hours.toString().length === 1) {
                hours = "0" + hours;
            }
            if (minutes.toString().length === 1) {
                minutes = "0" + minutes;
            }

            const messageData = {
                caller_name: caller,
                room_id: roomId,
                send_user_id: userId,
                send_user_type: userType,
                message: currentMessage,
                time: year + '-' + month + '-' + date + " " + hours + ":" + minutes
            };
    
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    
    return (
        <>
            <Header title="채팅방" />
            <div className="mr-8 ml-8 mt-10 h-fit flex flex-col justify-center">
                <div className="h-10 rounded bg-cyan-500 p-2">
                    <p className="text-white font-bold">{receiverName}</p>
                </div>
                <div className="h-96 rounded border-2">
                    <ScrollToBottom className="w-full h-full overflow-y-scroll overflow-x-hidden">
                        {messageList.map((messageContent) => {
                            userType === messageContent.send_user_type ? 
                            (<div className="h-auto p-3 flex justify-end">
                                <div className="w-40">
                                    <div className="w-auto h-auto min-h-[40px] max-w-full bg-cyan-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-sm">{messageContent.caller_name}</p>
                                        <p className="text-xs">{messageContent.time}</p>
                                    </div>
                                </div>
                            </div>
                            )
                            :
                            (<div className="h-auto p-3 flex">
                                <div className="w-40">
                                    <div className="w-auto h-auto min-h-[40px] max-w-full bg-gray-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-sm">{messageContent.caller_name}</p>
                                        <p className="text-xs">{messageContent.time}</p>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                        {/* <div className="h-auto p-3 flex">
                            <div className="w-40">
                                <div className="w-auto h-auto min-h-[40px] max-w-full bg-gray-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                                    <p>다른인간</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm">왕경업</p>
                                    <p className="text-xs">2022-05-30 11:30</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-auto p-3 flex justify-end">
                            <div className="w-40">
                                <div className="w-auto h-auto min-h-[40px] max-w-full bg-cyan-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                                    <p>나</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-sm">김건엽</p>
                                    <p className="text-xs">2022-05-30 11:30</p>
                                </div>
                            </div>
                        </div> */}
                    </ScrollToBottom>
                </div>
                <div className="h-10">
                    <input 
                        type="text"
                        value={currentMessage}
                        placeholder="메시지입력해라"
                        className="h-full border-2 rounded w-10/12"
                        onChange={(e) => {
                            setCurrentMessage(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            e.key === "Enter" && sendMessage();
                        }}
                    />
                    <button className="h-full w-2/12 border-2 rounded">&#9658;</button>
                </div>
            </div>
        </>
    );
}

export default ChatRoomPage;