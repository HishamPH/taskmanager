import User from "../../entity/user";

interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<any>;
  loginUser(hashPass: string, password: string): Promise<boolean>;
  addTask(userId: string, task: any): Promise<any>;
  editTask(userId: string, task: any): Promise<any>;
  deleteTask(userId: string, taskId: string): Promise<any>;
  getTasks(userId: string): Promise<any>;
}

export default IUserRepository;
