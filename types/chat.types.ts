export interface Message {
  id?: string;
  message: string;
  time: string;
  senderId: number;
  replayMetadata: boolean;
}

export interface Chat {
  id: number;
  userId: number;
  unseenMsgs: number;
  chat: Message[];
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error?: string;
} 