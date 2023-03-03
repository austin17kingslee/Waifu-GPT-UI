import React, { useState } from "react";import Header from "../Header/Index";

import waifuPlaceholder from 'src/assets/images/website/waifu-placeholder.png';
import logo from "src/assets/images/website/logo.png";
import waifuCenter from 'src/assets/images/website/waifu-center.png';
import comingSoon from 'src/assets/images/website/coming-soon.png';
import promptHeader from 'src/assets/images/website/prompt-header.png';
import twitterIcon from "src/assets/images/website/social-twitter.png";
import telegramIcon from "src/assets/images/website/social-telegram.png";
import { useDispatch } from "react-redux";
import { registerModal } from "src/app/redux/global/globalSlice";
import { MODAL_KEY, WAIFU_COMMANDS } from "src/app/configs/constants";
import Footer from '../Footer/Index';
import { getPromtString } from 'src/app/utils/helpers';
import { fetchWaifuImg } from 'src/app/services/api/waifuService';
import { Link } from 'react-router-dom';

export default function Summon() {
  const dispatch = useDispatch();

  const [waifuImg, setWaifuImg] = useState(waifuCenter);
  const [promptText, setPromptText] = useState('/waifu ');
  const [infoText, setInfoText] = useState('');

  function openWaifuImgModal() {
    dispatch(registerModal({
      key: MODAL_KEY.WAIFU_IMG,
      hidePanel: true,
      hideXBtn: true,
      content: <img src={waifuImg} alt="your waifu" />
    }));
  }

  function handleFocus(e: any){
    const target = e.target;
    console.log(e.target.value);
    setTimeout(() => {
      if (e?.target?.value?.length) {
        target.selectionStart = e.target.value.length;
        target.selectionEnd = e.target.value.length
      }
    }, 0);
  }

  function handleChangePrompt(e: any) {
    setPromptText(e.target.value);
  }



  async function summon() {
    // handle post promt to server
    console.log("++++++ promt", promptText)
    const promtObj = getPromtString(promptText, WAIFU_COMMANDS.WAIFU)
    if (promtObj.err){
      return setInfoText(`Sorry I can't understand you! Command needs to follow this format:`)
    }
    const promtString = promtObj.promt
    const imageObj = await fetchWaifuImg(promtString)
    if (imageObj.err){
      return setInfoText(imageObj.err.toString())
    }
    setWaifuImg(imageObj.src)
  }

  return (
    <div className="waifu-generator">
      {/* <Header /> */}

      <div className="flex-center-center" style={{ paddingTop: 24 }}>
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
      </div>

      <div className="summon" style={{ height: '900px' }}>
        <div className="summon__container container" style={{ zIndex: 2 }}>
          <div className="summon__wrapper" style={{ margin: '-780px auto' }}>
            <div className="relative flex-center-center">
              <img className="summon__waifu-placeholder" src={comingSoon} alt="waifu placeholder" />
              {/* <img className="absolute summon__waifu-center" src={waifuImg} alt="your waifu" onClick={openWaifuImgModal} /> */}
            </div>
            <div className="summon__instruction">
              <p>Sorry for the inconvenience, our website not yet ready. You can join our <a href="https://t.me/waifugpt" style={{ color: '#fde98f', fontWeight: 700 }}>Telegram channel</a> to use our free service.</p>
            </div>
            <div className="summon__prompt-block">
              <img src={promptHeader} alt="prompt header" />
              <div className="summon__prompt-block__content">
                <textarea
                  className="nice-scroll"
                  onFocus={handleFocus}
                  onChange={handleChangePrompt}
                  // rows={12}
                  disabled
                  value={promptText}
                  style={{ minHeight: 30 }}
                />
              </div>
            </div>
            {/* <div className="summon__action">
              <div className="btn-3" onClick={summon}>CREATE YOUR AI-WAIFU</div>
            </div> */}
            <div className="social">
              <a href="https://twitter.com/waifugpt" target="_blank" rel="noreferrer noopener">
                <img className="social__icon mr-2" src={twitterIcon} alt="twitterIcon" />
              </a>
              <a href="https://t.me/waifugpt" target="_blank" rel="noreferrer noopener">
                <img className="social__icon" src={telegramIcon} alt="telegramIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
