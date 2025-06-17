import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { API_ENDPOINTS } from "../config/api";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear any existing auth state on component mount
  useEffect(() => {
    dispatch(setAuthUser(null));
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Use the deployed backend URL instead of localhost
      const backendUrl = 'https://your-backend-url.onrender.com'; // Replace with your actual backend URL
      const res = await axios.post(
        `${backendUrl}/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Login response:", res.data);
      dispatch(setAuthUser(res.data));
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  // Function to clear localStorage and Redux state
  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setAuthUser(null));
    toast.success("Storage cleared");
    window.location.reload();
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>

          <p className="text-center my-2">
            Don't have an account? <Link to="/signup">signup</Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
        <button 
          onClick={clearStorage}
          className="btn btn-sm mt-4 text-xs"
        >
          Clear Storage (If Login Issues)
        </button>
      </div>
    </div>
  );
};

export default Login;
