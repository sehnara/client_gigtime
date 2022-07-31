import React, { useState } from "react";
import Header from "../components/Header";
import ScrollToBottom from "react-scroll-to-bottom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import OtherChatbox from "../components/OtherChatbox";
import MeChatbox from "../components/MeChatbox";
import { useInView } from "react-intersection-observer";
import axios from "axios";

function ChatRoomPage({ socket }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [userType, setUserType] = useState("");
  const [userId, setUserId] = useState("");
  const [chatId, setChatId] = useState(0);
  const [ref, inView] = useInView();
  const location = useLocation();

  const receiverName = location.state.receiverName;
  const caller = location.state.caller;
  const roomId = location.state.roomId;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const year = new Date(Date.now()).getFullYear();
      let month = new Date(Date.now()).getMonth() + 1;
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
        createdAt:
          year + "-" + month + "-" + date + " " + hours + ":" + minutes,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const getData = () => {
    if (sessionStorage.getItem("worker_id")) {
      axios
      .get(`${process.env.REACT_APP_ROUTE_PATH}/chatting/message/loading`, {
        params: {
          room_id: roomId,
          cursor: "null",
          user_id: sessionStorage.getItem("worker_id"),
          user_type: "worker",
        },
      })
      .then((res) => {
        setChatId(res.data[res.data.length - 1].chatting_id);
        setUserType("worker");
        setUserId(sessionStorage.getItem("worker_id"));
        const arr = res.data.sort((a, b) => {
          return a.chatting_id - b.chatting_id;
        });
        return arr;
      })
      .then((arr) => {
        setMessageList(arr);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      axios
      .get(`${process.env.REACT_APP_ROUTE_PATH}/chatting/message/loading`, {
        params: {
          room_id: roomId,
          cursor: "null",
          user_id: sessionStorage.getItem("owner_id"),
          user_type: "owner",
        },
      })
      .then((res) => {
        setChatId(res.data[res.data.length - 1].chatting_id);
        setUserType("owner");
        setUserId(sessionStorage.getItem("owner_id"));
        const arr = res.data.sort((a, b) => {
          return a.chatting_id - b.chatting_id;
        });
        return arr;
      })
      .then((arr) => {
        setMessageList(arr);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (inView) {
      axios
        .get(`${process.env.REACT_APP_ROUTE_PATH}/chatting/message/loading`, {
          params: {
            room_id: roomId,
            cursor: chatId - 1,
            user_id: userId,
            user_type: userType,
          },
        })
        .then((res) => {
          console.log(res.data)
          // setChatId(res.data[res.data.length - 1].chatting_id);
          const arr = res.data.sort((a, b) => {
            return a.chatting_id - b.chatting_id;
          });
          return arr;
        })
        .then((arr) => {
          setMessageList((list) => [...arr, ...list]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inView]);

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
                if (index === 1) {
                  return (
                    <div
                      className="h-auto p-3 flex justify-end"
                      key={index}
                      ref={ref}
                    >
                      <div className="w-40">
                        <div className="w-auto h-auto min-h-[40px] max-w-full bg-cyan-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="flex flex-col">
                          {/* <p className="font-bold text-sm">{messageContent.caller_name}</p> */}
                          <p className="text-xs">{messageContent.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <MeChatbox key={index} messageContent={messageContent} />
                  );
                }
              } else {
                if (index === 1) {
                  return (
                    <div className="h-auto p-3 flex" key={index} ref={ref}>
                      <div className="w-40">
                        <div className="w-auto h-auto min-h-[40px] max-w-full bg-gray-500 rounded-lg pt-3 pl-2 text-sm text-white braek-words">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-sm">
                            {messageContent.caller_name}
                          </p>
                          <p className="text-xs">{messageContent.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <OtherChatbox key={index} messageContent={messageContent} />
                  );
                }
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
          <button
            className="h-full w-2/12 border-2 rounded"
            onClick={sendMessage}
          >
            &#9658;
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatRoomPage;
