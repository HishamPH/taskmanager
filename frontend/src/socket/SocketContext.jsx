import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";

const SocketContext = createContext();

const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    console.log("socket is not initialized");
    return {};
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = userInfo ? true : false;
  useEffect(() => {
    if (userInfo) {
      const socketUrl = import.meta.env.VITE_BACKEND;
      const socket = io(socketUrl, {
        query: { userId: userInfo._id },
      });
      setSocket(socket);
      return () => {
        socket.close();
        setSocket(null);
        console.log("socket closed successfully");
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        console.log("no user detected socket is closing");
      }
    }
  }, [isLoggedIn]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext, useSocketContext };
