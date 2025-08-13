"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import NewTask from "../task/NewTask";
import { Task } from "../interfaces/Task";
import { toDoListStore } from "../../store/toDoListStore";

export default function List() {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);
  const { list, addTask, deleteTask, editTask, convertTimeToString } =
    toDoListStore();
  const [editTaskItem, setEditTaskItem] = useState<Task | null>(null);

  const handleAddTask = () => {
    setShowCreateTaskForm(!showCreateTaskForm);
  };

  const setTaskItem = useCallback(
    (task: Task) => {
      setEditTaskItem(task);
    },
    [editTaskItem]
  );

  // useEffect(() => {
  //   if (editTaskItem) {
  //     editTask(editTaskItem);
  //   }
  // }, [editTaskItem]);

  return (
    <div className="p-4">
      <div>
        <button
          onClick={handleAddTask}
          className="rounded rounder-full bg-green-600 px-3 m-4 text-white cursor-pointer"
        >
          <AddIcon /> Crear tarea
        </button>
      </div>
      {showCreateTaskForm && (
        <div className="animate-fade-in-down">
          <NewTask addToDoList={addTask} task={editTaskItem ?? undefined} />
        </div>
      )}

      {list.length === 0 && (
        <div className="flex items-center justify-center text-center py-8">
          No hay elementos
        </div>
      )}
      <div className="bg-white">
        {list.map((item: Task) => (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center gap-4 border-b-2 border-gray-300 p-2"
          >
            <div className="col-span-1 flex items-center justify-center">
              <input type="checkbox" className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="col-span-2">
              <span>{convertTimeToString(item.startTime)} </span>-
              <span> {convertTimeToString(item.endTime)}</span>
            </div>
            <div className="col-span-6 overflow-hidden">{item.taskName}</div>
            <div className="col-span-3 flex justify-end gap-2">
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => setTaskItem(item)}
                >
                  <EditIcon />
                </button>
              </div>
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => deleteTask(item.id)}
                >
                  <DeleteForeverIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
