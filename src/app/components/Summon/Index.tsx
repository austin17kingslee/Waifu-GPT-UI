import React, { useState } from "react";import Header from "../Header/Index";

import waifuPlaceholder from 'src/assets/images/website/waifu-placeholder.png';
import waifuCenter from 'src/assets/images/website/waifu-center.png';
import promptHeader from 'src/assets/images/website/prompt-header.png';
import { useDispatch } from "react-redux";
import { registerModal } from "src/app/redux/global/globalSlice";
import { MODAL_KEY } from "src/app/configs/constants";
import Footer from '../Footer/Index';

export default function Summon() {
  const dispatch = useDispatch();

  const [waifuImg, setWaifuImg] = useState(waifuCenter);
  const [promptText, setPromptText] = useState('/waifu ');

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

  function summon() {
    //
  }

  return (
    <div className="waifu-generator">
      <Header />

      <div className="summon">
        <div className="summon__container container">
          <div className="summon__wrapper">
            <div className="relative flex-center-center">
              <img className="summon__waifu-placeholder" src={waifuPlaceholder} alt="waifu placeholder" />
              <img className="absolute summon__waifu-center" src={waifuImg} alt="your waifu" onClick={openWaifuImgModal} />
            </div>
            <div className="summon__instruction">
              <p>Hi Master, please enter Prompt and start summon your waifu.</p>
              <p>/waifu[space]word_1,word_2,...,word_n</p>
            </div>
            <div className="summon__prompt-block">
              <img src={promptHeader} alt="prompt header" />
              <div className="summon__prompt-block__content">
                <textarea
                  className="nice-scroll"
                  onFocus={handleFocus}
                  onChange={handleChangePrompt}
                  // rows={12}
                  value={promptText}
                />
              </div>
            </div>
            <div className="summon__action">
              <div className="btn-3" onClick={summon}>CREATE YOUR AI-WAIFU</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
