import Signup from "./components/Signup";
import {createBrowserRouter, RouterProvider, Navigate, createRoutesFromElements, Route} from "react-router-dom";
import './App.css'
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers, setAuthUser } from "./redux/userSlice";
import axios from "axios";

// Set global axios defaults
axios.defaults.withCredentials = true;

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on initial load
  useEffect(() => {
    // Clear any potentially invalid auth state on initial load
    dispatch(setAuthUser(null));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(authUser) {
      const socketio = io('http://localhost:8080', {
        query:{
          userId:authUser._id
        }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=> socketio.close();
    } else {
      if (socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);

  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Create router with authentication check
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    )
  );

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;


