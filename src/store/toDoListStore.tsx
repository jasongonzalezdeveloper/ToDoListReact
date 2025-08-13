"use client";
import { Task } from "@/components/interfaces/Task";
import { create } from "zustand";

type toDoListStoreInterface = {
  list: Task[];
  addTask: (taskName: string, startTime: string, endTime: string) => void;
  editTask: (task: Task) => void;
  deleteTask: (idTask: number) => void;
  convertTimeToString: (time: string) => string;
};

export const toDoListStore = create<toDoListStoreInterface>((set, get) => ({
  list: [],

  addTask: (taskName, startTime, endTime) =>
    set((state) => ({
      list: [
        ...state.list,
        {
          id: Date.now(),
          taskName: taskName,
          startTime: startTime,
          endTime: endTime,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ],
    })),

  editTask: (task) =>
    set((state) => ({
      list: state.list.map((item) => {
        if (item.id === task.id) {
          return { ...item, ...task };
        }
        return item;
      }),
    })),

  deleteTask: (idTask) =>
    set((state) => ({
      list: state.list.filter((item) => item.id !== idTask),
    })),

  convertTimeToString: (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    if (hours > 0 && hours < 12) {
      return `${time} AM`;
    } else {
      return `${time} PM`;
    }
  },
}));
