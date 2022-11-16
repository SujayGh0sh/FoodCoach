import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();


  //signup/login database
  // const INITIAL_STATE = JSON.parse(localStorage.getItem("user")) || null
  const [rootUser, setRootUser] = useState(null)  //root user will contain the id

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(rootUser));
  }, [rootUser]);

  //update tokenId
  useEffect(() => {

    // only update if you have id and tokenId fields

    // let Id = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : null;

    const saveTokenId = async () => {
      if (rootUser) {
        try {
          const res = await axios.put('http://localhost:5000/api/token/', {
            _id: rootUser._id,
            tokenId: me
          })
          console.log(res);
        } catch (error) {
          console.log(error)
        }
      }
    }
    saveTokenId()
  }, [me, rootUser])






  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        if (myVideo.current)
          myVideo.current.srcObject = currentStream;
        console.log("current streams:", currentStream)
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [rootUser]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  //database queries
  //add signup and login methods here and use them in the login and sigup page.


  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      rootUser,
      setRootUser
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
