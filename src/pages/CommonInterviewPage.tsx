import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const pc_config = {
  // {
  //   urls: 'stun:[STUN_IP]:[PORT]',
  //   'credentials': '[YOR CREDENTIALS]',
  //   'username': '[USERNAME]'
  // },
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      urls: "stun:stun1.l.google.com:19302",
    },
    {
      urls: "stun:stun2.l.google.com:19302",
    },
    {
      urls: "stun:stun3.l.google.com:19302",
    },
    {
      urls: "stun:stun4.l.google.com:19302",
    },
    {
      urls: "turn:openrelay.metered.ca:80",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
    {
      urls: "turn:openrelay.metered.ca:443?transport=tcp",
      username: "openrelayproject",
      credential: "openrelayproject",
    },
  ],
};
/* Server Socket URL : REACT_APP_SOCKET_SERVER -> .env edit*/

// const SOCKET_SERVER_URL = `${process.env.REACT_APP_SOCKET_SERVER}`;

type CommonInterviewPageProps = {
  socket?: SocketIOClient.Socket;
};

// room_full 에 대한 처리가 없음!
const CommonInterviewPage = ({ socket }: CommonInterviewPageProps) => {
  // 사장님, 워커에 따라 다른 인자로 통신을 함.
  const [onMike, setOnMike] = useState(true);
  const [onScreen, setOnScreen] = useState(true);

  const stream = useRef<MediaStream>();
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcRef = useRef<RTCPeerConnection>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const location = useLocation();
  const getState = location.state as { room: string; isOwner: boolean };
  const roomID = getState.room;
  const isOwner = getState.isOwner;
  const navigate = useNavigate();

  const setVideoTracks = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current)
        localVideoRef.current.srcObject = stream.current;
      if (!(pcRef.current && socketRef.current)) return;
      stream.current.getTracks().forEach((track) => {
        if (!pcRef.current) return;
        pcRef.current.addTrack(track, stream.current as MediaStream);
      });
      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) return;
          console.log("onicecandidate");
          socketRef.current.emit("candidate", e.candidate);
        }
      };
      pcRef.current.oniceconnectionstatechange = (e) => {
        console.log(e);
      };
      pcRef.current.ontrack = (ev) => {
        console.log("add remotetrack success");
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = ev.streams[0];
        }
      };
      socketRef.current.emit("join_room", {
        room: roomID,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create offer");
    if (!(pcRef.current && socketRef.current)) return;
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
      socketRef.current.emit("offer", sdp);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(pcRef.current && socketRef.current)) return;
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("answer set remote description success");
      const mySdp = await pcRef.current.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      console.log("create answer");
      await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
      socketRef.current.emit("answer", mySdp);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = socket;
    if (socketRef.current !== undefined) {
      pcRef.current = new RTCPeerConnection(pc_config);

      socketRef.current.on("all_users", (allUsers: Array<{ id: string }>) => {
        if (allUsers.length > 0) {
          createOffer();
        }
      });

      socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
        //console.log(sdp);
        console.log("get offer");
        createAnswer(sdp);
      });

      socketRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
        console.log("get answer");
        if (!pcRef.current) return;
        pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        //console.log(sdp);
      });

      socketRef.current.on(
        "getCandidate",
        async (candidate: RTCIceCandidateInit) => {
          if (!pcRef.current) return;
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          console.log("candidate add success");
        }
      );

      socketRef.current.on(roomID, (msg: string) => {
        alert(msg);
        window.location.reload();
      });

      setVideoTracks();

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        if (pcRef.current) {
          pcRef.current.close();
        }
      };
    }
  }, []);
  function handleMike(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (stream.current !== undefined) {
      stream.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
    if (!onMike) {
      setOnMike(true);
    } else {
      setOnMike(false);
    }
  }
  function handleScreen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(stream);
    if (stream.current !== undefined) {
      stream.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
    }
    if (onScreen) {
      setOnScreen(false);
    } else {
      setOnScreen(true);
    }
  }
  function handleExit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (socketRef.current !== undefined) {
      socketRef.current.emit("leave_room");
    }
    if (isOwner) {
      // 상점 주인일 경우 axios 통신 후 이동
      axios
        .post(
          `${process.env.REACT_APP_ROUTE_PATH}/owner/mypage/interview/exit`,
          {
            interview_id: roomID,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.state === "success") {
            navigate(-1);
          } else {
            alert("error!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      navigate(-1);
    }
  }
  return (
    <div>
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* <div className="relative"> */}
        <video
          ref={localVideoRef}
          muted
          playsInline
          autoPlay
          className="absolute z-20 w-1/3 top-0 right-0"
        />

        <video
          id="remotevideo"
          ref={remoteVideoRef}
          playsInline
          autoPlay
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        />
        {/* </div> */}

        <div className="z-30 flex items-center justify-center w-40 rounded-3xl space-x-5 py-2 bg-gray-200 border-4 border-cyan-700 pt-2 mt-auto mb-20">
          <button id="mike" onClick={handleMike} className="">
            <img
              src={
                onMike
                  ? require(`../images/no-mute.png`)
                  : require(`../images/mute.png`)
              }
              width="25"
              height="25"
              alt="Mute On/Off"
            />
          </button>{" "}
          <button id="screen" onClick={handleScreen} className="">
            <img
              src={
                onScreen
                  ? require(`../images/video.png`)
                  : require(`../images/no-video.png`)
              }
              width="25"
              height="25"
              alt="Screen On/Off"
            />
          </button>{" "}
          <button id="exit" onClick={handleExit} className="">
            <img
              src={require(`../images/logout.png`)}
              width="25"
              height="25"
              alt="Exit"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonInterviewPage;
