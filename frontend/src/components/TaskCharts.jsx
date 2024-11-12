import React, { useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const generateRandomData = () => ({
  jobs: Math.floor(Math.random() * 50) + 10,
  applicants: Math.floor(Math.random() * 500) + 100,
  interviews: Math.floor(Math.random() * 20) + 5,
});

const COLORS = ["#00C49F", "#0088FE", "#FF4D4D"];

const TaskCharts = ({ tasks }) => {
  const total = tasks.length;
  const pending = tasks.reduce((acc, item) => {
    if (!item.completed) {
      acc++;
    }
    return acc;
  }, 0);
  const completed = total - pending;
  const overdue = tasks.reduce((acc, item) => {
    const dueDate = new Date(item.dueDate).getTime();
    const currentDate = new Date().getTime();
    if (dueDate <= currentDate && !item.completed) {
      acc++;
    }
    return acc;
  }, 0);

  const generatePieData = () => [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ];

  const data = generateRandomData();
  const pieData = generatePieData();
  return (
    <Card className="xl:w-5/12 w-full m-3 rounded-sm bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Task Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-4">
        <StatCard
          title="Total Tasks"
          value={total}
          color="bg-blue-100 text-blue-800"
          icon="📊"
        />
        <StatCard
          title="Completed"
          value={completed}
          color="bg-green-100 text-green-800"
          icon="✅"
        />
        <StatCard
          title="Pending"
          value={pending}
          color="bg-yellow-100 text-yellow-800"
          icon="⏳"
        />
        <StatCard
          title="overdue"
          value={overdue}
          color="bg-red-100 text-red-800"
          icon="🕰️"
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-4 mb-10">
        {pieData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div
    className={`${color} rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105`}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-medium text-center text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default TaskCharts;
