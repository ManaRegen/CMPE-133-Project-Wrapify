import React from 'react';
import './LoginPage.css';

function App() {
  return (
    <div class='Login-Page'>
      <h1>Welcome to Wrapify</h1>
      <button onClick={() => window.location = 'http://localhost:5001/login'}>Log in with Spotify</button>
    </div>
  );
}

export default App;

