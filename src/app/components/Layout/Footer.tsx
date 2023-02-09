import React from "react";
import twitterIcon from "src/assets/images/website/social-twitter.png";
import telegramIcon from "src/assets/images/website/social-telegram.png";
import logo from "src/assets/images/website/logo.png";

export default function Footer() {
  return (
    <div className="footer container">
      <div className="social">
        <div className="social__bg">
          <a className="social__icon" href="#" target="_blank" rel="noreferrer noopener">
            <img src={twitterIcon} alt="twitterIcon" />
          </a>
          <a className="social__icon" href="#" target="_blank" rel="noreferrer noopener">
            <img src={telegramIcon} alt="telegramIcon" />
          </a>
        </div>
      </div>
      <img className="header__logo" src={logo} alt="logo" />
    </div>
  );
}
