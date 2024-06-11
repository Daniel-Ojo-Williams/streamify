import { useState, useEffect, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProivder = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const socket = io('http://localhost:5000')

    // --| Disconnect the socket when the component is unmounted
    return () => socket.disconnect();
  }, [])

  return <SocketContext.Provider>{ children }</SocketContext.Provider>
}