import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addMessage } from '../store/slices/chatsSlice';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);
  const chat = useSelector((state: RootState) =>
    state.chats.chats.find((c) => c.phoneNumber === selectedChat)
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    dispatch(
      addMessage({
        id: Date.now().toString(),
        content: newMessage,
        timestamp: new Date(),
        isOutgoing: true,
        phoneNumber: selectedChat,
      })
    );
    setNewMessage('');
  };

  if (!selectedChat || !chat) {
    return (
      <div className="flex-1 bg-emerald-50 flex items-center justify-center">
        <p className="text-emerald-600">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-emerald-50">
      <div className="p-4 bg-emerald-800 text-white flex items-center">
        <img
          src={chat.avatar}
          alt={chat.phoneNumber}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold">{chat.phoneNumber}</h2>
          <p className="text-sm text-emerald-200">{chat.type}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isOutgoing
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.isOutgoing ? 'text-emerald-200' : 'text-gray-500'
              }`}>
                {format(new Date(message.timestamp), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;