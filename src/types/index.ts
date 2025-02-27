export type ChatType = 'USER' | 'BUSINESS' | 'BROADCAST';

export interface IMessage {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  idMessage?: string; // answer of server

  timestamp: Date;
  isOutgoing: boolean;
  phoneNumber: string;
}

// chat

export interface Chat {
  phoneNumber: string;
  lastMessage: string;
  avatar: string;
  type: ChatType;
  messages: IMessage[];
}

// auth

export interface AuthState {
  isAuthenticated: boolean;
}
