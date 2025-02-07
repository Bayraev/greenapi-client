import { Provider } from 'react-redux';
import { store } from './store/store';
import Toolbar from './components/Toolbar';
import ChatsList from './components/ChatsList';
import ChatWindow from './components/ChatWindow';
import { Toaster } from 'sonner';

function App() {
  return (
    <Provider store={store}>
      <Toaster richColors expand={true} />
      <div className="flex h-screen bg-gray-100">
        <Toolbar />
        <ChatsList />
        <ChatWindow />
      </div>
    </Provider>
  );
}

export default App;
