import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Input,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import moment from "moment";
import axiosInstance from "../api/axiosInterceptor";

const TaskInput = ({ open, setOpen, task, onSubmit, handleClose }) => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
  });
  useEffect(() => {
    if (task) {
      setEdit(true);
      const dueDate = moment(task.dueDate);
      setData({
        name: task.name,
        description: task.description,
        date: dueDate.format("YYYY-MM-DD"),
        time: dueDate.format("HH:mm"),
      });
    } else {
      setEdit(false);
      setData({
        name: "",
        description: "",
        date: "",
        time: "",
      });
    }
  }, [task]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, date, time } = data;
    const combinedDateTime = moment(
      `${date} ${time}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();

    let formData = {
      name,
      description,
      dueDate: combinedDateTime,
    };
    if (edit) {
      formData.completed = task.completed;
      formData._id = task._id;
    }
    onSubmit(formData, edit);
    setData({
      name: "",
      description: "",
      date: "",
      time: "",
    });
    setOpen(false);
  };

  const minDate = moment().format("YYYY-MM-DD");

  // Set min time to the current time if today is selected
  const minTime = data.date === minDate ? moment().format("HH:mm") : "00:00";

  const handleOpen = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <Dialog
      open={open}
      handler={() => {
        setData({ name: "", description: "", date: "", time: "" });
        handleClose();
      }}
      size="xs"
      className="z-20"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-4 bg-white shadow rounded"
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-4 font-semibold"
        >
          {edit ? "Edit task" : "Add New Task"}
        </Typography>

        <div className="mb-4">
          <Input
            label="Task Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Textarea
            label="Description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            type="date"
            label="Due Date"
            name="date"
            min={minDate}
            value={data.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            type="time"
            label="Due Time"
            name="time"
            min={minTime}
            value={data.time}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" color="blue" fullWidth>
          {edit ? "Edit task" : "Add Task"}
        </Button>
      </form>
    </Dialog>
  );
};

export default TaskInput;
