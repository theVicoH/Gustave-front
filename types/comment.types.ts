import { SubTask } from "./subtask.types";

export type Comment = {
  id: string;
  avatar: string;
  name: string;
  text: string;
  date: string;
  subTaskId: SubTask["id"];
};