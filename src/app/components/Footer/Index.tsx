import React from "react";
import logo from "src/assets/images/website/logo.png";
import arbiscan from "src/assets/images/website/arbiscan.png";
import uniswap from "src/assets/images/website/uniswap.png";
import dextools from "src/assets/images/website/dextools.png";
import twitterIcon from "src/assets/images/website/social-twitter.png";
import telegramIcon from "src/assets/images/website/social-telegram.png";

export default function Footer() {
  return (
    <div className="footer">
      {/* <div className="flex-center-center check">
        <div className="mr-5 fs-4 fw-4 top-4">CHECK US ON</div>
        <div>
          <a href="https://waifugpt.com/" target="_blank" rel="noreferrer noopener">
            <img className="mr-4" style={{ width: 150 }} src={uniswap} alt="uniswap" />
          </a>
          <a href="https://waifugpt.com/" target="_blank" rel="noreferrer noopener">
            <img className="mr-4 top-2" style={{ width: 110 }} src={dextools} alt="dextools" />
          </a>
          <a href="https://waifugpt.com/" target="_blank" rel="noreferrer noopener">
            <img className="top-3" style={{ width: 180 }} src={arbiscan} alt="arbiscan" />
          </a>
        </div>
      </div> */}

      <div className="social">
        <div className="social__bg">
          <a href="https://twitter.com/waifugpt" target="_blank" rel="noreferrer noopener">
            <img className="social__icon mr-2" src={twitterIcon} alt="twitterIcon" />
          </a>
          <a href="https://t.me/waifugpt" target="_blank" rel="noreferrer noopener">
            <img className="social__icon" src={telegramIcon} alt="telegramIcon" />
          </a>
        </div>
        <img className="token__logo" src={logo} alt="logo" />
      </div>
    </div>
  );
}
