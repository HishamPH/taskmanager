import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Checkbox,
  IconButton,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import moment from "moment";

const formatDate = (date) => {
  const momentDate = moment(date);
  const now = moment();

  if (momentDate.isSame(now, "day")) {
    return `${momentDate.format("hh:mm A")} Today`;
  } else if (momentDate.isSame(now.clone().subtract(1, "day"), "day")) {
    return `${momentDate.format("hh:mm A")} Yesterday`;
  } else if (momentDate.isSame(now.clone().add(1, "day"), "day")) {
    return `${momentDate.format("hh:mm A")} Tomorrow`;
  } else {
    return momentDate.format("hh:mm A DD/MM/YYYY");
  }
};

export default function TaskCard({
  _id,
  name,
  description,
  completed,
  dueDate,
  onDelete,
  onUpdate,
  onToggleComplete,
}) {
  const cardColors = completed
    ? "bg-green-50 border-green-200"
    : "bg-blue-50 border-blue-200";

  return (
    <Card className={`w-md m-4 ${cardColors}`}>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className={`font-semibold truncate ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {name}
          </Typography>
          <div className="flex space-x-2">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => onUpdate({ _id, name, description, dueDate })}
            >
              <PencilIcon className="h-5 w-5" />
            </IconButton>
            <IconButton
              variant="text"
              color="red"
              onClick={() => onDelete(_id)}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
        <Typography
          color="gray"
          className={`mb-3 font-normal truncate ${
            completed ? "line-through" : ""
          }`}
        >
          {description}
        </Typography>
        <Typography
          color="gray"
          className={`font-medium mb-3  ${completed ? "line-through" : ""}`}
        >
          Due: {formatDate(dueDate)}
        </Typography>
        <div className="flex items-center">
          <Checkbox
            id={`task-${_id}`}
            checked={completed}
            onChange={() => onToggleComplete(_id)}
            color="green"
            className="h-6 w-6 rounded-full border-2 border-green-500 transition-all hover:scale-105 hover:before:opacity-0"
            containerProps={{ className: "p-0" }}
          />
          <Typography color="gray" className="font-medium ml-2">
            {completed ? "Completed" : "Mark as complete"}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
