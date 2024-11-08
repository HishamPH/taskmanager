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

export default function TaskCard({
  id,
  title,
  description,
  completed,
  onDelete,
  onUpdate,
  onToggleComplete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    onUpdate(id, editTitle, editDescription);
    setIsEditing(false);
  };

  const cardColors = completed
    ? "bg-green-50 border-green-200"
    : "bg-blue-50 border-blue-200";

  return (
    <Card className={`w-full max-w-md mx-auto mb-4 ${cardColors}`}>
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className={`font-semibold ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </Typography>
          <div className="flex space-x-2">
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="h-5 w-5" />
            </IconButton>
            <IconButton variant="text" color="red" onClick={() => onDelete(id)}>
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
        <Typography
          color="gray"
          className={`mb-4 font-normal ${completed ? "line-through" : ""}`}
        >
          {description}
        </Typography>
        <div className="flex items-center">
          <Checkbox
            id={`task-${id}`}
            checked={completed}
            onChange={() => onToggleComplete(id)}
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

{
  /* <div className="space-y-4">
  <Input
    type="text"
    value={editTitle}
    onChange={(e) => setEditTitle(e.target.value)}
    placeholder="Task title"
    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
    labelProps={{
      className: "hidden",
    }}
    containerProps={{ className: "min-w-[100px]" }}
  />
  <Textarea
    value={editDescription}
    onChange={(e) => setEditDescription(e.target.value)}
    placeholder="Task description"
    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
    labelProps={{
      className: "hidden",
    }}
    containerProps={{ className: "min-w-[100px]" }}
  />
  <div className="flex justify-end space-x-2">
    <Button
      className="flex items-center gap-2"
      color="green"
      onClick={handleSave}
    >
      <CheckIcon strokeWidth={2} className="h-5 w-5" /> Save
    </Button>
    <Button
      className="flex items-center gap-2"
      color="red"
      variant="outlined"
      onClick={() => setIsEditing(false)}
    >
      <XMarkIcon strokeWidth={2} className="h-5 w-5" /> Cancel
    </Button>
  </div>
</div>; */
}
