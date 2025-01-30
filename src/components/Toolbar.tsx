import React, { useState } from 'react';
import { LogIn, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { addChat } from '../store/slices/chatsSlice';
import { ChatType } from '../types';

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [authForm, setAuthForm] = useState({
    apiInstance: '',
    apiTokenInstance: '',
  });
  const [addForm, setAddForm] = useState({
    number: '',
    message: '',
    type: 'USER' as ChatType,
  });

  const handleAuth = () => {
    dispatch(setCredentials(authForm));
    setShowAuthModal(false);
  };

  const handleAddChat = () => {
    dispatch(
      addChat({
        phoneNumber: addForm.number,
        type: addForm.type,
        message: addForm.message,
      })
    );
    setShowAddModal(false);
  };

  return (
    <div className="bg-emerald-800 w-16 flex flex-col items-center py-4 space-y-4">
      <button
        onClick={() => setShowAuthModal(true)}
        className="p-2 hover:bg-emerald-700 rounded-full"
      >
        <LogIn className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => setShowAddModal(true)}
        className="p-2 hover:bg-emerald-700 rounded-full"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Authentication</h2>
            <input
              type="text"
              placeholder="API Instance"
              className="w-full mb-3 p-2 border rounded"
              value={authForm.apiInstance}
              onChange={(e) =>
                setAuthForm({ ...authForm, apiInstance: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="API Token Instance"
              className="w-full mb-4 p-2 border rounded"
              value={authForm.apiTokenInstance}
              onChange={(e) =>
                setAuthForm({ ...authForm, apiTokenInstance: e.target.value })
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAuth}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Chat Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Chat</h2>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-3 p-2 border rounded"
              value={addForm.number}
              onChange={(e) =>
                setAddForm({ ...addForm, number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Message"
              className="w-full mb-4 p-2 border rounded"
              value={addForm.message}
              onChange={(e) =>
                setAddForm({ ...addForm, message: e.target.value })
              }
            />
            <div className="mb-4">
              <label className="block mb-2">Chat Type:</label>
              <div className="space-x-4">
                {(['USER', 'BUSINESS', 'BROADCAST'] as ChatType[]).map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      value={type}
                      checked={addForm.type === type}
                      onChange={(e) =>
                        setAddForm({ ...addForm, type: e.target.value as ChatType })
                      }
                      className="form-radio text-emerald-600"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddChat}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;