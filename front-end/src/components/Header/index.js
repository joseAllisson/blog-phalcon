import React from "react";
import { NavLink } from "react-router-dom";

import './style.css';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <img
              src="./images/phalcon.png"
              alt="phalcon"
              style={{ width: "60px", height: "60px" }}
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" exact aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/postagem" className="nav-link" aria-current="page">
                  Postagem
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
