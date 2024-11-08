import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSocketContext } from "../socket/SocketContext";
import TaskCard from "../components/TaskCard";

// const tasks = [
//   {
//     id: 1,
//     title: "Finish report",
//     description: "Complete the quarterly sales report",
//     dueDate: new Date("2023-05-15T12:00:00"),
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Schedule team meeting",
//     description: "Gather the team to discuss project updates",
//     dueDate: new Date("2023-05-18T14:30:00"),
//     completed: true,
//   },
// ];

const Home = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project",
      description: "Finish the React project by Friday",
      completed: false,
    },
    {
      id: 2,
      title: "Go grocery shopping",
      description: "Buy fruits, vegetables, and milk",
      completed: true,
    },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdate = (id, newTitle, newDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <NavBar />
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
{
  /* <div className="p-8">
  <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {tasks.map((task) => (
      <TaskCard key={task.id} task={task} />
    ))}
  </div>
</div>; */
}
