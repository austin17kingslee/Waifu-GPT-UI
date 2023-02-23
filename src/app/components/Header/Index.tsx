import React from "react";
import logo from "src/assets/images/website/logo.png";
import { Link } from 'react-router-dom';

export default function Summon() {
  return (
    <div className="header">
      <div className="container">
        <div className="header flex-center-between">
          <Link to="/">
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <div className="flex header__links">
            <a className="header__link" href="/#feature">Feature</a>
            <a className="header__link" href="/#roadmap">Roadmap</a>
            <Link to="/summon">
              <div className="btn-2">Create Waifu</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
