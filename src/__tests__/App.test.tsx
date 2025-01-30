import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import chatsReducer from '../store/slices/chatsSlice';
import App from '../App';

// Create a test store
const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      chats: chatsReducer,
    },
  });

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Chats')).toBeInTheDocument();
  });

  it('shows auth modal when login button is clicked', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>
    );
    
    // Find and click the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Check if modal appears
    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('API Instance')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('API Token Instance')).toBeInTheDocument();
  });

  it('shows add chat modal when plus button is clicked', () => {
    render(
      <Provider store={createTestStore()}>
        <App />
      </Provider>
    );
    
    // Find and click the add button
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    // Check if modal appears
    expect(screen.getByText('Add New Chat')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
    expect(screen.getByText('BUSINESS')).toBeInTheDocument();
    expect(screen.getByText('BROADCAST')).toBeInTheDocument();
  });
});