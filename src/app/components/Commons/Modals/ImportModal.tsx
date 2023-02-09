import React from "react";
import MetamaskAccount from "src/app/components/Account/MetamaskAccount";
import WalletConnectAccount from "src/app/components/Account/WalletConnectAccount";
import CoinbaseWalletAccount from "src/app/components/Account/CoinbaseWalletAccount";
import { clearAccount, importAccount } from "src/app/redux/account/accountSlice";
import { useAppDispatch } from "src/app/redux";
import { closeModal, registerModal } from "src/app/redux/global/globalSlice";
import { MODAL_KEY } from "src/app/configs/constants";
import CubeLoadingModal from "src/app/components/Commons/Modals/CubeLoadingModal";

export type WalletAccount = {
  openErrorModal: any;
  setLoadingModal: any;
  connectWallet?: any;
}

export default function ImportModal() {
  const dispatch = useAppDispatch();

  function connectWallet(address: string, wallet: any, type: string) {
    if (address) {
      wallet.getDisconnected(
        () => dispatch(clearAccount()),
        (address: string, wallet: any, type: string) => {
          dispatch(importAccount({ address, wallet, type }))
        },
        wallet
      );

      dispatch(importAccount({ address, wallet, type }));
      // modalService.close();
    }
  }

  function setLoadingModal(active: boolean) {
    if (active) {
      dispatch(registerModal({
        key: MODAL_KEY.CUBE_LOADING,
        className: "loading-modal",
        hidePanel: true,
        hideXBtn: true,
        content: <CubeLoadingModal />,
      }));
    } else {
      dispatch(closeModal(MODAL_KEY.CUBE_LOADING));
    }
  }

  function openErrorModal(message: string) {
    dispatch(registerModal({
      key: MODAL_KEY.WALLET_CONNECT_ERROR,
      title: "Connection Error",
      content: message,
    }));
  }

  return (
    <div className="account">
      <MetamaskAccount
        connectWallet={connectWallet}
        openErrorModal={openErrorModal}
        setLoadingModal={setLoadingModal}
      />

      <WalletConnectAccount
        connectWallet={connectWallet}
        openErrorModal={openErrorModal}
        setLoadingModal={setLoadingModal}
      />

      <CoinbaseWalletAccount
        openErrorModal={openErrorModal}
        setLoadingModal={setLoadingModal}
      />
    </div>
  )
}