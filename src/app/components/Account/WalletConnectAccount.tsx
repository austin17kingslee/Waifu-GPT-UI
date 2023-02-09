import React from 'react';
import WalletConnectService from "src/app/services/accounts/WalletConnectService";
import { WALLET_TYPE } from "src/app/configs/constants";
import { WalletAccount } from "src/app/components/Commons/Modals/ImportModal";
import { selectAccount, useAppSelector } from "src/app/redux";
import { getWalletParams } from "src/app/utils/helpers";
import { useDispatch } from "react-redux";
import { closeAllModals } from "src/app/redux/global/globalSlice";

export default function WalletConnectAccount(props: WalletAccount) {
  const dispatch = useDispatch();
  const { chainId } = useAppSelector(selectAccount);

  async function connect() {
    props.setLoadingModal(true);

    try {
      const walletParams = getWalletParams(chainId);
      const wallet = new WalletConnectService(walletParams);
      const result = await wallet.initiateWallet();

      if (result) {
        const address = await wallet.connect(props.openErrorModal);
        if (address) {
          props.connectWallet(address, wallet, WALLET_TYPE.WALLET_CONNECT);
          dispatch(closeAllModals());
          return;
        }
      }
    } catch (e) {
      console.log(e)
    }

    props.setLoadingModal(false);
  }

  return (
    <div className="account__item" onClick={connect}>
      <div className="account__icon wallet-connect"/>
      <div className="account__name">Connect</div>
    </div>
  )
};
