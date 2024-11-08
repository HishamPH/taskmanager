interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tasks: {
    name: string;
    completed: boolean;
    dueDate: Date;
    description: string;
    createAt: Date;
    updateAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
export default User;
