import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './v2/contexts/AuthContext';
import { UserQueueProvider } from './v2/contexts/UserQueueContext';
import { EventSourceProvider } from './v2/contexts/EventSourceContext';
import { WindowSizeProvider } from './v2/contexts/WindowSizeContext';
import { SnackbarProvider } from './v2/contexts/SnackbarContext';
import { AudioSettingsProvider } from './v2/contexts/AudioSettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AudioSettingsProvider>
    <SnackbarProvider>
      <AuthProvider>
        <EventSourceProvider>
          <UserQueueProvider>
            <App />
          </UserQueueProvider>
        </EventSourceProvider>
      </AuthProvider>
  </SnackbarProvider>
  </AudioSettingsProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
