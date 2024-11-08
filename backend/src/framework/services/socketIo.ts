import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";
import ISocketIo from "../../usecases/interfaces/ISocketIo";
import { config } from "dotenv";
config();
const app: Application = express();
const server = http.createServer(app);

export default class SocketIo implements ISocketIo {
  private ioInstance: Server;
  private userSocketMap: { [key: string]: string | undefined } = {};
  constructor() {
    this.ioInstance = new Server(server, {
      cors: {
        origin: process.env.ORIGIN,
        methods: ["GET", "POST"],
      },
    });
    this.setupListeners();
  }

  private setupListeners() {
    try {
      this.ioInstance.on("connection", async (socket) => {
        const userId = socket.handshake.query?.userId as string;
        if (userId !== undefined) {
          console.log("socket connected with id", socket.id);
          this.userSocketMap[userId] = socket.id;
          socket.join(userId);
        }
        socket.on("disconnect", () => {
          console.log("disconnected the socket with id ", socket.id);
          delete this.userSocketMap[userId];
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  async updateTask(userId: string): Promise<any> {
    try {
      const roomId = userId.toString();
      console.log(roomId);
    } catch (err) {
      console.log(err);
    }
  }
}

export { app, server };
