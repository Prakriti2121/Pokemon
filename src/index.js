import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyC1VpENaB16dCqhaMYsdDDpkNab0o6MGQI",
  authDomain: "pokemon-681c8.firebaseapp.com",
  projectId: "pokemon-681c8",
  storageBucket: "pokemon-681c8.appspot.com",
  messagingSenderId: "270177776698",
  appId: "1:270177776698:web:09f05f57aafcdb31833103",
  measurementId: "G-KR3WSCJ0Y3"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
