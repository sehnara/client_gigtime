import React, { useState } from "react";
import Header from "../components/Header";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import OtherChatbox from "../components/OtherChatbox";
import MeChatbox from "../components/MeChatbox";
import axios from "axios";

function ChatRoomPage( { socket } ) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const [requestData, setRequestData] = useState([]);
    const [chatId, setChatId] = useState(0);
    const location = useLocation();
    const receiverName = location.state.receiverName
    const caller = location.state.caller;
    const roomId = location.state.roomId;

    const sendMessage = async () => {
        if (currentMessage !== "") {
            
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
                createdAt: year + '-' + month + '-' + date + " " + hours + ":" + minutes
            };
    
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("worker_id")) {
            setUserType("worker");
            setUserId(sessionStorage.getItem("worker_id"));
        } else {
            setUserType("owner");
            setUserId(sessionStorage.getItem("owner_id"));
        }

        axios.get('http://localhost:4000/chatting/message/loading', {
            params: {
                room_id: roomId,
                cursor: "null"
            }
        })
        .then((res) => {
            setRequestData(res.data.sort(function(a, b) {
                return a.chatting_id - b.chatting_id;
            }));
            setChatId(res.data[res.data.length - 1].chatting_id);
            setMessageList(requestData)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

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
                        {messageList.map((messageContent, index) => {
                            if (caller === messageContent.caller_name) {
                                return <MeChatbox key={index} messageContent={messageContent}/>
                            } else {
                                return <OtherChatbox key={index} messageContent={messageContent}/>
                            }
                        })}
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
                    <button className="h-full w-2/12 border-2 rounded" onClick={sendMessage}>&#9658;</button>
                </div>
            </div>
        </>
    );
}

export default ChatRoomPage;