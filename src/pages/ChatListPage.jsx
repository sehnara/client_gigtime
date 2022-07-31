import React, { useEffect, useState } from "react";
import ChatCard from "../components/ChatCard";
import Header from "../components/Header";
import axios from "axios";
import NavBar from "../components/NavBar";

function ChatListPage({ socket }) {
  const [chatData, setChatData] = useState([]);
  const [lastChatData, setLastChatData] = useState({});
  const [chatRead, setChatRead] = useState(0);

  const getData = async () => {
    if (sessionStorage.getItem("worker_id")) {
      await axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/chatting/room/list`, {
          id: sessionStorage.getItem("worker_id"),
          type: "worker",
        })
        .then((res) => {
          console.log(res.data)
          setChatData(res.data);
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_ROUTE_PATH}/chatting/room/list`, {
          id: sessionStorage.getItem("owner_id"),
          type: "owner",
        })
        .then((res) => {
          setChatData(res.data);
        });
    }
  };

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
      {/* <NavBar mode={"WORKER"} /> */}
      <Header title="채팅 목록" worker={"CHAT"} />
      <div className="m-8 flex flex-col overflow-scroll">
        {/* <ChatCard key={3} caller={"김건엽"} receiverName={"강세훈"} lastChat={"난 알바를 가기가 싫어"} date={"2022-07-25"} time={"7시 15분"}/> */}
        {chatData.map((el, index) => {
          socket.emit("join_chat_room", el.room_id);

          if (el.room_id === lastChatData.room_id) {
            el.last_chat = lastChatData.message;
            el.time = lastChatData.createdAt;
            el.not_read_chat = el.not_read_chat + chatRead
            console.log(el.last_chat);
            console.log(el.time);
            console.log(el.caller_name);
          }
          return (
            <ChatCard
              key={index}
              receiverName={el.receiver_name}
              lastChat={el.last_chat}
              caller={el.caller_name}
              time={el.time}
              roomId={el.room_id}
              notRead={el.not_read_chat}
            />
          );
        })}
      </div>
    </>
  );
}

export default ChatListPage;
