import React from 'react';
import './LoginPage.css';

function App() {
  return (
    <div className='Login-Page'>
      <h1>Welcome to Wrapify</h1>
      <button onClick={() => window.location = 'http://localhost:5000/login'}>Log in with Spotify</button>
    </div>
  );
}

export default App;

