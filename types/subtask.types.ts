import { Task } from "./task.types";

type Status = "todo" | "inprogress" | "completed" | "archived";
type Priority = "low" | "medium" | "high";

type Assignment = {
  image: string;
    label: string;
    value: string;
};

export type SubTask = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assign: Assignment[];
  assignDate: string;
  dueDate: string;
  completed: boolean;
  logo: null;
  taskId: Task["id"];
};