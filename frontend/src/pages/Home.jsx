import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "@material-tailwind/react";
import NavBar from "../components/NavBar";
import { useSocketContext } from "../socket/SocketContext";
import TaskCard from "../components/TaskCard";
import TaskInput from "../components/TaskInput";
import { Success, Failed } from "../helper/popup";
import axiosInstance from "../api/axiosInterceptor";

import TaskCharts from "../components/TaskCharts";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LoadingOverlay = ({ loading }) => {
  return loading ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  ) : null;
};

const Home = () => {
  const { socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleSocketUpdate = (data) => {
    setTasks(data);
  };

  useEffect(() => {
    if (socket) {
      socket.on("updateTask", handleSocketUpdate);
      return () => socket.off(handleSocketUpdate);
    }
  }, [socket]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/user/get-tasks");
        setTasks(res.data.result);
      } catch (err) {
        Failed(err.response ? err.response.data.message : err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/user/delete-task/${id}`);
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (data) => {
    setTask(data);
    setOpen(true);
  };

  const handleToggleComplete = async (id) => {
    try {
      setLoading(true);
      const task = tasks.find((task) => task._id === id);
      task.completed = !task.completed;

      const res = await axiosInstance.post("/user/edit-task", task, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (task, edit) => {
    try {
      setLoading(true);

      console.log(edit);
      let path;
      if (edit) {
        path = "edit-task";
      } else {
        path = "add-task";
      }
      const res = await axiosInstance.post(`/user/${path}`, task, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      Failed(err.response ? err.response.data.message : err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
      setTask([]);
    }
  };

  const handleCreate = async () => {
    setTask(null);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <>
      <LoadingOverlay loading={loading} />
      <NavBar />
      <div className="xl:flex m-2">
        <Card className="xl:w-7/12 w-full m-3 bg-gray-50">
          <Button onClick={handleCreate} className="w-fit m-6 rounded-sm">
            +add task
          </Button>
          <div className="grid md:grid-cols-2 overflow-y-auto h-[600px]">
            {tasks?.map((task) => (
              <TaskCard
                key={task._id}
                {...task}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </Card>
        <TaskCharts tasks={tasks} />
      </div>

      <TaskInput
        open={open}
        setOpen={setOpen}
        task={task}
        handleClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
