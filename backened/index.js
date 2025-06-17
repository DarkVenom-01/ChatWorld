// const express = require('express') // method-1
import express from "express"; // method-2
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// Improved CORS configuration for both development and production
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://chatworld-1.onrender.com'  // Your deployed frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(_dirname, "/frontened/dist")));
app.use((req,res)=>{
    res.sendFile(path.resolve(_dirname, "frontened", "dist", "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
