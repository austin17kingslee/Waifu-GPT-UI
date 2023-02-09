import React from 'react';
import MetamaskService from "src/app/services/accounts/MetamaskService";
import { WALLET_TYPE } from "src/app/configs/constants";
import { WalletAccount } from "src/app/components/Commons/Modals/ImportModal";
import { getWalletParams } from "src/app/utils/helpers";
import { selectAccount, useAppSelector } from "src/app/redux";
import { closeAllModals } from "src/app/redux/global/globalSlice";
import { useDispatch } from "react-redux";

export default function MetamaskAccount(props: WalletAccount) {
  const dispatch = useDispatch();
  const { chainId } = useAppSelector(selectAccount);

  async function connect() {
    props.setLoadingModal(true);

    const walletParams = getWalletParams(chainId);
    const wallet = new MetamaskService(walletParams);
    const address = await wallet.connect(props.openErrorModal);

    if (address) {
      props.connectWallet(address, wallet, WALLET_TYPE.METAMASK);
      dispatch(closeAllModals());
    } else {
      props.setLoadingModal(false);
    }
  }

  return (
    <div className="account__item" onClick={connect}>
      <div className="account__icon metamask"/>
      <div className="account__name">Metamask</div>
    </div>
  )
};
