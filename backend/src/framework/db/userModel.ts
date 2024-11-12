import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

import User from "../../entity/user";

const taskSchema = new Schema({
  name: {
    type: String,
    required: true, // You can decide if this should be required
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const userSchema: Schema<User> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<User>("save", async function (next) {
  if (this.password) this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.index({ name: "text" });
const userModel: Model<User> = mongoose.model("User", userSchema);
export default userModel;
