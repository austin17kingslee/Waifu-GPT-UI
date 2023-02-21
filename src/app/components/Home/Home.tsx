import React from "react";
import waifu1 from "src/assets/images/website/waifu-1.png";
import waifu2 from "src/assets/images/website/waifu-2.png";
import waifu3 from "src/assets/images/website/waifu-3.png";
import waifuCreate from "src/assets/images/website/waifu-create.png";
import waifuCare from "src/assets/images/website/waifu-care.png";
import waifuThere from "src/assets/images/website/waifu-there.png";
import waifu247 from "src/assets/images/website/waifu-247.png";
import waifuEmpathy from "src/assets/images/website/waifu-empathy.png";
import waifuJudgemental from "src/assets/images/website/waifu-non-judmental.png";
import waifuPrompt from "src/assets/images/website/waifu-prompt.png";
import roadmapTitle from "src/assets/images/website/roadmap-title.png";
import roadmapPhase1 from "src/assets/images/website/roadmap-phase-1.png";
import roadmapPhase2 from "src/assets/images/website/roadmap-phase-2.png";
import roadmapPhase3 from "src/assets/images/website/roadmap-phase-3.png";
import waifuToken from "src/assets/images/website/waifu-token.png";
import FloatingStar from "src/app/components/Commons/FloatingStar";
import twitterIcon from "src/assets/images/website/social-twitter.png";
import telegramIcon from "src/assets/images/website/social-telegram.png";
import logo from "src/assets/images/website/logo.png";
import pricingTable from "src/assets/images/website/pricing-table.png";
import gallery from "src/assets/images/website/waifu-gallery.png";
import arbiscan from "src/assets/images/website/arbiscan.png";
import uniswap from "src/assets/images/website/uniswap.png";
import dextools from "src/assets/images/website/dextools.png";
import { useDispatch } from "react-redux";
import { registerModal } from "src/app/redux/global/globalSlice";
import { MODAL_KEY } from "src/app/configs/constants";
import comingSoon from "src/assets/images/website/coming soon.svg";

export default function Home() {
  const dispatch = useDispatch();

  function openCreateWaifuModal() {
    dispatch(registerModal({
      key: MODAL_KEY.CREATE_WAIFU,
      hidePanel: true,
      hideXBtn: true,
      content: <img src={comingSoon} alt="comingSoon" />
    }));
  }

  return (
    <div className="home">
      <div className="container">
        <div className="header flex-center-between">
          <img className="header__logo" src={logo} alt="logo" />
          <div className="flex header__links">
            <a className="header__link" href="#feature">Feature</a>
            <a className="header__link" href="#roadmap">Roadmap</a>
            <div className="btn-2" onClick={openCreateWaifuModal}>Create Waifu</div>
          </div>
        </div>
      </div>

      <div className="create">
        <div className="container create__container flex-center-between">
          <img className="create__waifu" src={waifu1} alt="waifu1" />
          <img className="create__create" src={waifuCreate} alt="waifuCreate" />
        </div>
      </div>

      <div className="care">
        <div className="container flex-center-between">
          <FloatingStar speed={-2} style={{ width: 40, left: 10 }} />
          <FloatingStar speed={7} style={{ width: 50, top: "80%", left: "50%" }} />
          <FloatingStar speed={-6} style={{ width: 30, right: 30 }} />
          <img className="column-6" src={waifuCare} alt="waifuCare" />
          <img className="column-6" src={waifu2} alt="waifu2" />
        </div>
      </div>

      <div id="feature" className="there">
        <div className="container">
          <FloatingStar speed={-4} style={{ width: 40, left: 0 }} />
          <FloatingStar speed={5} style={{ width: 25, top: "70%", left: 420 }} />
          <FloatingStar speed={1} style={{ width: 50, top: "50%", right: 10 }} />
          <img src={waifuThere} alt="waifuThere" />
          <div className="flex-start-between there__content">
            <div className="column-4 there__column">
              <img className="there__icon" src={waifu247} alt="waifu247" />
              <div className="there__title">24/7 Availability</div>
              <div className="there__desc">Your Waifu is always available to talk and support you, no matter the time of day or night WAIFU helps with stress relief.</div>
            </div>
            <div className="column-4 there__column">
              <img className="there__icon" src={waifuEmpathy} alt="waifuEmpathy" />
              <div className="there__title">Genuine Empathy</div>
              <div className="there__desc">Your AI companion is designed to understand and empathize with your emotions, providing a comforting and supportive experience.</div>
            </div>
            <div className="column-4 there__column">
              <img className="there__icon" src={waifuJudgemental} alt="waifuJudgemental" />
              <div className="there__title">Non-judgmental</div>
              <div className="there__desc">Your AI companion is here to offer emotional support and a listening ear, whenever you need it, wherever you need it.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="prompt">
        <div className="container flex-center-between">
          <FloatingStar speed={-7} style={{ width: 50, left: 0, top: 20 }} />
          <FloatingStar speed={2} style={{ width: 25, top: "70%", left: 490 }} />
          <FloatingStar speed={5} style={{ width: 35, top: "50%", right: 0 }} />
          <img className="prompt__waifu" src={waifu3} alt="waifu3" />
          <div className="prompt__content">
            <img className="prompt__image" src={waifuPrompt} alt="waifuPrompt" />
            <div className="prompt__text">AI companion allowing you to fully customize your virtual anime girl. From her appearance to her personality, you have complete control over every aspect of your anime companion.</div>
          </div>
        </div>
      </div>

      <div id="roadmap" className="roadmap">
        <div className="container">
          <img className="roadmap__title" src={roadmapTitle} alt="roadmapTitle" />
          <div className="flex-center-between roadmap__content">
            <img className="column-4" src={roadmapPhase1} alt="roadmapPhase1" />
            <img className="column-4" src={roadmapPhase2} alt="roadmapPhase2" />
            <img className="column-4" src={roadmapPhase3} alt="roadmapPhase3" />
          </div>
        </div>
      </div>

      <div className="token">
        <div className="container token__container">
          <FloatingStar speed={-7} style={{ width: 50, left: 0, top: 250 }} />
          <FloatingStar speed={6} style={{ width: 50, right: 0, top: 250 }} />
          <FloatingStar speed={1} style={{ width: 30, left: 150, top: 200 }} />
          <FloatingStar speed={-4} style={{ width: 30, right: 150, top: 200 }} />
          <img className="token__icon" src={waifuToken} alt="waifuToken" />
          <div className="token__title">WGPT TOKEN</div>
          <div className="token__text">
            WGPT Token, the driving force behind our AI-powered ecosystem. This revolutionary token is designed to
            power all the features and services offered on our site, creating a seamless and interconnected experience
            for users. By holding WGPT Tokens, you can access premium features, unlock new functionality, and participate in
            the growth of our ecosystem. Join us on the cutting edge of AI technology and become a part of the future with WGPT Token.
          </div>
          <div className="fs-4 mt-2 mb-4"><b>Official Contract on Arbitrum One:</b> <i className="fw-3 fs-3">TBD</i></div>
        </div>
      </div>

      <div className="pricing container">
        <FloatingStar speed={-7} style={{ width: 50, left: 0, top: 20 }} />
        <FloatingStar speed={2} style={{ width: 25, top: "80%", left: 420 }} />
        <FloatingStar speed={5} style={{ width: 35, top: "50%", right: 0 }} />
        <div className="pricing__title">Pricing</div>
        <div className="pricing__table">
          <div className="pricing__block">
            <img src={pricingTable} alt="pricingTable" />
            <div className="pricing__package">Trial</div>
            <div className="pricing__content">
              <div>Using For</div>
              <div className="pricing__price">Free</div>
              <div className="pricing__text">5 requests per day</div>
              <div className="pricing__button btn-2" onClick={openCreateWaifuModal}>Activate</div>
            </div>
          </div>
          <div className="pricing__block">
            <img src={pricingTable} alt="pricingTable" />
            <div className="pricing__package">Standard</div>
            <div className="pricing__content">
              <div>From</div>
              <div className="pricing__price">1000 WGPT</div>
              <div className="pricing__text">Unlimited requests for a month</div>
              <div className="pricing__text">Fast response times</div>
              <div className="pricing__button btn-2" onClick={openCreateWaifuModal}>Activate</div>
            </div>
          </div>
          <div className="pricing__block">
            <img src={pricingTable} alt="pricingTable" />
            <div className="pricing__package">Pro</div>
            <div className="pricing__content">
              <div>From</div>
              <div className="pricing__price">10,000 WGPT</div>
              <div className="pricing__text">Unlimited requests for a lifetime</div>
              <div className="pricing__text">Faster response times</div>
              <div className="pricing__text">Priority access to beta features</div>
              <div className="pricing__button btn-2" onClick={openCreateWaifuModal}>Activate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-10">
        <img src={gallery} alt="gallery" />
      </div>

      <div className="flex-center-center check">
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
      </div>

      <div className="social">
        <div className="social__bg">
          <a href="https://waifugpt.com/" target="_blank" rel="noreferrer noopener">
            <img className="social__icon mr-2" src={twitterIcon} alt="twitterIcon" />
          </a>
          <a href="https://waifugpt.com/" target="_blank" rel="noreferrer noopener">
            <img className="social__icon" src={telegramIcon} alt="telegramIcon" />
          </a>
        </div>
        <img className="token__logo" src={logo} alt="logo" />
      </div>
    </div>
  );
}
