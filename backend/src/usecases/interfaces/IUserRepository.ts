import User from "../../entity/user";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<any>;
  loginUser(hashPass: string, password: string): Promise<boolean>;
}

export default IUserRepository;
