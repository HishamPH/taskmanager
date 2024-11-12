import User from "../entity/user";
import IUserRepository from "./interfaces/IUserRepository";
import IJwtToken from "./interfaces/IJwtToken";
import ISocketIo from "./interfaces/ISocketIo";

interface ResponseType {
  _id?: string;
  result?: User | {} | null;
  status?: boolean;
  statusCode: number;
  message?: string;
  activationToken?: string;
  accessToken?: string;
  refreshToken?: string;
  authToken?: string;
}

class UserUseCase {
  private iUserRepository: IUserRepository;
  private iJwtToken: IJwtToken;
  private iSocket: ISocketIo;
  constructor(
    iUserRepository: IUserRepository,
    iJwtToken: IJwtToken,
    iSocket: ISocketIo
  ) {
    this.iUserRepository = iUserRepository;
    this.iJwtToken = iJwtToken;
    this.iSocket = iSocket;
  }

  async createUser(user: User): Promise<ResponseType> {
    try {
      const exist = await this.iUserRepository.findByEmail(user.email);
      if (exist) {
        return {
          status: false,
          statusCode: 409,
          message: "user already exists",
        };
      }
      const data = await this.iUserRepository.createUser(user);
      if (!data) {
        return {
          statusCode: 500,
          message: "error in creating user",
        };
      }
      const { _id, name, email, tasks } = data;
      const result = { _id, name, email, tasks };
      const accessToken = await this.iJwtToken.SignInAccessToken({ id: _id });
      const refreshToken = await this.iJwtToken.SignInRefreshToken({ id: _id });
      return {
        statusCode: 200,
        message: "User registered SuccessFully",
        result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async loginUser(user: User): Promise<ResponseType> {
    try {
      const exist = await this.iUserRepository.findByEmail(user.email);
      if (!exist) {
        return {
          status: false,
          statusCode: 409,
          message: "user doesn't exist",
        };
      }
      const isValid = await this.iUserRepository.loginUser(
        exist.password,
        user.password
      );
      if (!isValid) {
        return {
          statusCode: 401,
          message: "Invalid credentials",
        };
      }
      const { _id, name, email, tasks } = exist;
      const result = { _id, name, email, tasks };
      const accessToken = await this.iJwtToken.SignInAccessToken({ id: _id });
      const refreshToken = await this.iJwtToken.SignInRefreshToken({ id: _id });
      return {
        statusCode: 200,
        message: "Login successful",
        result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async getTasks(userId: string): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.getTasks(userId);
      return {
        statusCode: 200,
        message: "Login successful",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }

  async addTask(userId: string, task: any): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.addTask(userId, task);
      await this.iSocket.updateTask(userId, result);
      return {
        statusCode: 200,
        message: "Login successful",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async editTask(userId: string, task: any): Promise<ResponseType> {
    try {
      if (!task._id) {
        console.log(task._id);
        return {
          status: false,
          statusCode: 401,
          message: "the task id is missing",
        };
      }
      const result = await this.iUserRepository.editTask(userId, task);
      await this.iSocket.updateTask(userId, result);
      return {
        statusCode: 200,
        message: "Login successful",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
  async deleteTask(userId: string, taskId: string): Promise<ResponseType> {
    try {
      const result = await this.iUserRepository.deleteTask(userId, taskId);
      await this.iSocket.updateTask(userId, result);
      return {
        statusCode: 200,
        message: "Login successful",
        result,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        statusCode: 500,
        message: "Internal server Error",
      };
    }
  }
}

export default UserUseCase;
