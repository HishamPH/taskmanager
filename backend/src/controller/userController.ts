import { Request, Response, NextFunction } from "express";
import UserUseCase from "../usecases/userUseCase";

class UserController {
  private userCase: UserUseCase;
  constructor(userCase: UserUseCase) {
    this.userCase = userCase;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await this.userCase.createUser(userData);
      if (user.accessToken && user.refreshToken) {
        res.cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", user.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await this.userCase.loginUser(userData);
      if (user.accessToken && user.refreshToken) {
        res.cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", user.accessToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const user = await this.userCase.getTasks(userId);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async addTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = req.body;
      const userId = req.user.id;
      const user = await this.userCase.addTask(userId, task);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async editTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = req.body;
      const userId = req.user.id;
      const user = await this.userCase.editTask(userId, task);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id;
      const userId = req.user.id;
      const user = await this.userCase.deleteTask(userId, taskId);
      return res.status(user?.statusCode).json({ ...user });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("logout");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User LogOut success fully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default UserController;
