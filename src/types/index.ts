export type ChatType = 'USER' | 'BUSINESS' | 'BROADCAST';

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOutgoing: boolean;
  phoneNumber: string;
}

export interface Chat {
  phoneNumber: string;
  lastMessage: string;
  avatar: string;
  type: ChatType;
  messages: Message[];
}

export interface AuthState {
  apiInstance: string;
  apiTokenInstance: string;
  isAuthenticated: boolean;
}