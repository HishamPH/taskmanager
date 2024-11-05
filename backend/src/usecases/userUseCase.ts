import User from "../entity/user";
import IUserRepository from "./interfaces/IUserRepository";
import IJwtToken from "./interfaces/IJwtToken";

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
  constructor(iUserRepository: IUserRepository, iJwtToken: IJwtToken) {
    this.iUserRepository = iUserRepository;
    this.iJwtToken = iJwtToken;
  }

  async createUser(user: User): Promise<ResponseType> {
    try {
      return {
        statusCode: 200,
        message: "User registered SuccessFully",
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
