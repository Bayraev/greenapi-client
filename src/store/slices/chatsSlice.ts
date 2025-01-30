import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message, ChatType } from '../../types';

interface ChatsState {
  chats: Chat[];
  selectedChat: string | null;
}

const initialState: ChatsState = {
  chats: [],
  selectedChat: null,
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChat: (
      state,
      action: PayloadAction<{
        phoneNumber: string;
        type: ChatType;
        message: string;
      }>
    ) => {
      const { phoneNumber, type, message } = action.payload;
      if (!state.chats.find((chat) => chat.phoneNumber === phoneNumber)) {
        state.chats.push({
          phoneNumber,
          type,
          lastMessage: message,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${phoneNumber}`,
          messages: [{
            id: Date.now().toString(),
            content: message,
            timestamp: new Date(),
            isOutgoing: true,
            phoneNumber,
          }],
        });
      }
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const chat = state.chats.find(
        (c) => c.phoneNumber === action.payload.phoneNumber
      );
      if (chat) {
        chat.messages.push(action.payload);
        chat.lastMessage = action.payload.content;
      }
    },
  },
});

export const { addChat, selectChat, addMessage } = chatsSlice.actions;
export default chatsSlice.reducer;