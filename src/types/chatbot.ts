import { Status } from "./types";

export interface CreateChatBotBody {
  name: string;
  status: Status;
}