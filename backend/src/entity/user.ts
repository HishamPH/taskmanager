interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  tasks: {
    _id: string;
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
