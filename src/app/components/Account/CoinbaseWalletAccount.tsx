import React from 'react';
import { useDispatch } from "react-redux";
import { WALLET_TYPE } from "src/app/configs/constants";
import CoinbaseWalletService from "src/app/services/accounts/CoinbaseWalletService";
import { importAccount } from "src/app/redux/account/accountSlice";
import { getWalletParams } from "src/app/utils/helpers";
import { selectAccount, useAppSelector } from "src/app/redux";
import { WalletAccount } from "src/app/components/Commons/Modals/ImportModal";
import { closeAllModals } from "src/app/redux/global/globalSlice";

export default function CoinbaseWalletAccount(props: WalletAccount) {
  const dispatch = useDispatch();
  const { chainId } = useAppSelector(selectAccount);

  async function connect() {
    props.setLoadingModal(true);

    const walletParams = getWalletParams(chainId);
    const wallet = new CoinbaseWalletService(walletParams);
    const result = await wallet.initiateWallet();

    if (result) {
      const address = await wallet.connect(props.openErrorModal);

      if (address) {
        dispatch(importAccount({ address, wallet, type: WALLET_TYPE.COINBASE_WALLET }));
        dispatch(closeAllModals());
        return;
      }
    }

    props.setLoadingModal(false);
  }

  return (
    <div className="account__item" onClick={connect}>
      <div className="account__icon coinbase-wallet"/>
      <div className="account__name fs-2">Coinbase Wallet</div>
    </div>
  )
};
