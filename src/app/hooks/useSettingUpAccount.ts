import { useEffect } from 'react';
import { MOBILE_SCREEN_SIZE, MODAL_KEY, WALLET_TYPE } from "src/app/configs/constants";
import { checkIsMetamask, getWalletParams } from "src/app/utils/helpers";
import DappService from "src/app/services/accounts/DappService";
import { selectAccount, useAppDispatch, useAppSelector } from "src/app/redux";
import { clearAccount, importAccount } from "src/app/redux/account/accountSlice";
import { registerModal } from "src/app/redux/global/globalSlice";

export default function useSettingUpAccount() {
  const dispatch = useAppDispatch();
  const { chainId, address, wallet } = useAppSelector(selectAccount);

  useEffect(() => {
    detectAndConnectToDapp();
    callSubscribeToDisconnect();
  }, []); // eslint-disable-line

  async function detectAndConnectToDapp() {
    const isWalletExtension = checkIsMetamask();
    const isMobile = window.innerWidth < MOBILE_SCREEN_SIZE;
    const isWeb3Imported = window.ethereum;

    if (wallet && wallet.needTobeInitiated) {
      const result = await wallet.initiateWallet();
      if (!result) {
        dispatchClearAccount();
        return;
      }
    }

    if (address) {
      const currentAddr = await wallet.connect(openErrorModal);

      if (!currentAddr) {
        dispatchClearAccount();
      } else if (currentAddr && currentAddr !== address) {
        wallet.getDisconnected(dispatchClearAccount, dispatchImportAccount, wallet);
        dispatch(importAccount({ address: currentAddr, wallet, type: wallet.getWalletType() }))
      }
    }

    if (isWeb3Imported && (!isWalletExtension || isMobile)) {
      const walletParams = getWalletParams(chainId);
      const wallet = new DappService(walletParams);
      const address = await wallet.connect(openErrorModal);

      if (!address) return;

      dispatch(importAccount({ address, wallet, type: WALLET_TYPE.DAPP }))
    }
  }

  function callSubscribeToDisconnect() {
    if (wallet && typeof wallet.subscribeToDisconnect === 'function') {
      wallet.subscribeToDisconnect(dispatchClearAccount, dispatchImportAccount, wallet);
    }
  }

  function dispatchImportAccount(address: string, wallet: any, type: string) {
    dispatch(importAccount({ address, wallet, type }))
  }

  function dispatchClearAccount() {
    dispatch(clearAccount());
  }

  function openErrorModal(message: string) {
    dispatch(registerModal({
      key: MODAL_KEY.WALLET_CONNECT_ERROR,
      title: "Connection Error",
      content: message ? message : "Your session has expired.",
    }));
  }
}
