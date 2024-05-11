import React from 'react';
import './LoginPage.css';

function App() {
  return (
    <div class='Login-Page'>
      <h1>Spotify OAuth Example</h1>
      <button onClick={() => window.location = 'http://localhost:5000/login'}>Log in with Spotify</button>
    </div>
  );
}

export default App;

