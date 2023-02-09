import React from "react";
import logo from "src/assets/images/website/logo.png";
import comingSoon from "src/assets/images/website/coming soon.svg";
import { registerModal } from "src/app/redux/global/globalSlice";
import { MODAL_KEY } from "src/app/configs/constants";
import { useDispatch } from "react-redux";

export default function Header() {
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
  );
}
