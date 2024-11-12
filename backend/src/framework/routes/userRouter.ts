import express from "express";
const userRouter = express.Router();

import { userAuth } from "../middlewares/userAuth";
import JwtToken from "../services/jwtToken";
import SocketIo from "../services/socketIo";
import UserController from "../../controller/userController";
import UserUseCase from "../../usecases/userUseCase";
import UserRepository from "../repository/userRepository";

const jwtToken = new JwtToken();
const socketIo = new SocketIo();
const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository, jwtToken, socketIo);
const userController = new UserController(userUseCase);

userRouter.post("/signup", (req, res, next) => {
  userController.createUser(req, res, next);
});
userRouter.post("/login", (req, res, next) => {
  userController.loginUser(req, res, next);
});

userRouter.get("/get-tasks", userAuth, (req, res, next) => {
  userController.getTasks(req, res, next);
});

userRouter.post("/add-task", userAuth, (req, res, next) => {
  userController.addTask(req, res, next);
});

userRouter.post("/edit-task", userAuth, (req, res, next) => {
  userController.editTask(req, res, next);
});

userRouter.delete("/delete-task/:id", userAuth, (req, res, next) => {
  userController.deleteTask(req, res, next);
});

userRouter.post("/logout", (req, res, next) => {
  userController.logoutUser(req, res, next);
});

export default userRouter;
