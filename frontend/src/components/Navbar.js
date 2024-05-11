import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Ensure this CSS file exists and is styled appropriately

function Navbar({ isAuthenticated }) {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    // Redirects to login if user is not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src="/wrapify.jpg" alt="logo" className="navbar-logo" />
        <div className="navbar-links">
          <Link to="/discover" onClick={handleLoginRedirect}>
            Discover Music ⛵
          </Link>
          <Link to="/wrapped" onClick={handleLoginRedirect}>
            Wrapped 🎁
          </Link>
        </div>
        <div className="navbar-auth">
          {isAuthenticated ? (
            <a href="/logout">Log Out</a>
          ) : (
            <>
              <Link to="/login">Log In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
