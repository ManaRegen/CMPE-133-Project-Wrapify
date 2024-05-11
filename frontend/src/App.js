import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import WrappedPage from "./components/WrappedPage";
import TrackDetails from "./components/TrackDetails";
import ArtistDetails from "./components/ArtistDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is placed outside of Routes so it always renders */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wrapped" element={<WrappedPage />} />
        <Route path="/track/:id" element={<TrackDetails />} />
        <Route path="/artist/:id" element={<ArtistDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
