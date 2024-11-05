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
