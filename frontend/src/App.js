import React from 'react';
import styles from './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Wrapify</h1>
        <button onClick={() => window.location = 'http://localhost:5000/login'}>Log in with Spotify</button>
      </header>
    </div>
  );
}

export default App;
