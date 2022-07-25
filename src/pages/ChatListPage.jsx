import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import Header from "../components/Header";
import axios from "axios";


function ChatListPage( {socket} ) {
    const [chatData, setChatData] = useState([]);
    const [lastChatData, setLastChatData] = useState({});

    const getData = async() => {
        if (sessionStorage.getItem("worker_id")) {
            await axios.post("http://localhost:4000/chatting/room/list", {
                id: sessionStorage.getItem("worker_id"),
                type: "worker",
            })
            .then((res) => {
                setChatData(res.data);
                console.log(res.data);
            });
        } else {
            await axios.post("http://localhost:4000/chatting/room/list", {
                id: sessionStorage.getItem("owner_id"),
                type: "owner",
            })
            .then((res) => {
                setChatData(res.data);
                console.log(res.data);
            });
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setLastChatData(data);
        });
    }, [socket]);

    return (
        <>
            <Header title="채팅 목록" />
            <div className="m-8 flex flex-col overflow-scroll">
                {/* <ChatCard key={3} caller={"김건엽"} receiverName={"강세훈"} lastChat={"난 알바를 가기가 싫어"} date={"2022-07-25"} time={"7시 15분"}/> */}
                {chatData.map((el, index) => {
                    socket.emit("join_chat_room", el.room_id);

                    if(el.room_id === lastChatData.room_id){
                        el.last_chat = lastChatData.message;
                        el.time= lastChatData.createdAt;
                        console.log(el.last_chat)
                        console.log(el.time)
                        console.log(el.caller_name)
                    }
                    return (
                        <ChatCard 
                            key={index}
                            receiverName={el.receiver_name}
                            lastChat={el.last_chat}
                            caller={el.caller_name}
                            time={el.time}
                            roomId = {el.room_id}
                        />
                    );
                })}
            </div>
        </> 
    );
}

export default ChatListPage;