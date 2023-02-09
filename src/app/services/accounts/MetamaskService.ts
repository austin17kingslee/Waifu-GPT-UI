import { WALLET_TYPE } from "src/app/configs/constants";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";

export default class MetamaskService extends BaseWalletService {
  subscribeToDisconnect = (clearAccount: any, importAccount: any, wallet: any) => {
    this.getDisconnected(clearAccount, importAccount, wallet);
  };

  getWalletType = () => {
    return WALLET_TYPE.METAMASK;
  }
}