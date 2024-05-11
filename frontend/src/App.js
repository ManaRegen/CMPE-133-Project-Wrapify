import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import WrappedPage from "./components/WrappedPage";
/*

import DiscoverMusicPage from "./components/DiscoverMusicPage";


*/
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is placed outside of Routes so it always renders */}
      <Routes>
        {" "}
        {/* Use Routes instead of Switch */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wrapped" element={<WrappedPage />} />
        {/*
        <Route path="/discover" element={<DiscoverMusicPage />} />*/}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
