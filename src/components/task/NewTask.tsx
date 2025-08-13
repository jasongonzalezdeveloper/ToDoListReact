import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../interfaces/Task";

type NewTaskProps = {
  task?: Task;
  addToDoList: (taskName: string, startTime: string, endTime: string) => void;
};
export default function NewTask({ addToDoList, task }: NewTaskProps) {
  const [fomData, setFormData] = useState({
    taskName: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        taskName: task.taskName,
        startTime: task.startTime,
        endTime: task.endTime,
      });
    }
  }, [task]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fomData.taskName || !fomData.startTime || !fomData.endTime) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      addToDoList(fomData.taskName, fomData.startTime, fomData.endTime);
      setFormData({
        taskName: "",
        startTime: "",
        endTime: "",
      });
    }
  };

  return (
    <form className="p-4 bg-white shadow-md rounded grid grid-cols-1 md:grid-cols-12 gap-4 m-3">
      <div className="col-span-1 md:col-span-5">
        <label htmlFor="taskName">Nombre de la tarea:</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={fomData.taskName}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <label htmlFor="startTime">Hora de inicio:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={fomData.startTime}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <label htmlFor="endTime">Hora fin:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={fomData.endTime}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="col-span-1 md:col-span-3 flex items-end justify-end ">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-3 rounded-full cursor-pointer"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
