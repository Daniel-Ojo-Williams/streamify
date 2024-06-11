import { Server } from "socket.io";

import cookieParser from "cookie-parser";
import express from 'express';
import { createServer } from "http";

export const app = express();

app.use(express.json());
app.use(cookieParser());

export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  
});