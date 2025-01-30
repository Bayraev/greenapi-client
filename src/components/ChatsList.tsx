import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { selectChat } from '../store/slices/chatsSlice';
import { format } from 'date-fns';

const ChatsList: React.FC = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chats.chats);
  const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);

  return (
    <div className="w-80 bg-white border-r">
      <div className="p-4 bg-emerald-50">
        <h2 className="text-lg font-semibold text-emerald-900">Chats</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {chats.map((chat) => (
          <div
            key={chat.phoneNumber}
            onClick={() => dispatch(selectChat(chat.phoneNumber))}
            className={`p-4 border-b hover:bg-emerald-50 cursor-pointer ${
              selectedChat === chat.phoneNumber ? 'bg-emerald-100' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={chat.avatar}
                alt={chat.phoneNumber}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{chat.phoneNumber}</h3>
                  <span className="text-xs text-gray-500">
                    {format(new Date(chat.messages[chat.messages.length - 1].timestamp), 'HH:mm')}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatsList;