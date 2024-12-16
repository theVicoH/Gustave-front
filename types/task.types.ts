import { StaticImageData } from "next/image";
import { Board } from "./board.types";

type Priority = "low" | "medium" | "high";
type Status = "inprogress" | "completed";

type TaskAssignee = {
  name: string;
  image: StaticImageData;
};

type TaskListItem = {
  id: string;
  title: string;
};

export type Task = {
  boardId: Board["id"];
  id: string;
  title: string;
  desc: string;
  status: Status;
  tags: string[];
  priority: Priority;
  assign: TaskAssignee[];
  image: StaticImageData | "";
  category: string;
  pages: string;
  messageCount: string;
  link: string;
  date: string;
  time: string;
  list: TaskListItem[];
};