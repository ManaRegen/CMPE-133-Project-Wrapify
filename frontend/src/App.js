import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
/*
import WrappedPage from "./components/WrappedPage";
import DiscoverMusicPage from "./components/DiscoverMusicPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
*/
import "./App.css";

function App() {
  return (
    <Router>
      {/*<Navbar />*/} {/* Navbar is placed outside of Routes so it always renders */}
      <Routes>
        {" "}
        {/* Use Routes instead of Switch */}
        {/*<Route path="/home" element={<HomePage />} />*/}
        <Route path="/login" element={<LoginPage />} />

        {/*<Route path="/wrapped" element={<WrappedPage />} />
        <Route path="/discover" element={<DiscoverMusicPage />} />*/}

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
