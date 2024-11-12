import bcrypt from "bcryptjs";
import User from "../../entity/user";
import IUserRepository from "../../usecases/interfaces/IUserRepository";
import userModel from "../db/userModel";

class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await userModel.findOne({ email: email });
      if (user) return user;
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async createUser(user: User): Promise<any> {
    try {
      const { name, email, password } = user;
      const newUser = await userModel.create({ name, email, password });
      if (newUser) return newUser;
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async loginUser(hashPass: string, password: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashPass);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addTask(userId: string, task: any): Promise<any> {
    try {
      const result = await userModel.findByIdAndUpdate(
        userId,
        {
          $push: { tasks: task },
        },
        { new: true }
      );
      if (result) {
        return result.tasks;
      }
      return null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async editTask(userId: string, task: any): Promise<any> {
    try {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId, "tasks._id": task._id }, // Find user and task by taskData._id
        {
          $set: { "tasks.$": task }, // Update the task with taskData, including _id
        },
        { new: true }
      );

      return updatedUser?.tasks;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteTask(userId: string, taskId: string): Promise<any> {
    try {
      const result = await userModel.findByIdAndUpdate(
        userId,
        {
          $pull: { tasks: { _id: taskId } },
        },
        { new: true }
      );
      if (result) {
        return result.tasks;
      }
      return null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getTasks(userId: string): Promise<any> {
    try {
      const result = await userModel.findById(userId);
      if (result) {
        return result.tasks;
      }
      return null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default UserRepository;
