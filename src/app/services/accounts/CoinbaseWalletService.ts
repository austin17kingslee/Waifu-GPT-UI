import Web3 from "web3";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import BaseWalletService from "src/app/services/accounts/BaseWalletService";
import { WALLET_TYPE } from "src/app/configs/constants";

export default class CoinbaseWalletService extends BaseWalletService {
  constructor(props: any) {
    super(props);

    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: "Web3ReactStructure",
      appLogoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
    });

    this.wallet.needTobeInitiated = true;
    this.wallet.ethereum = coinbaseWallet.makeWeb3Provider(this.wallet.node, this.wallet.chainId);
    this.wallet.web3 = new Web3(this.wallet.ethereum);
  }

  initiateWallet = async (): Promise<boolean> => {
    try {
      await this.wallet.ethereum.enable();
      return true;
    } catch (e) {
      return false;
    }
  }

  disconnect = () => {
    this.wallet.ethereum.close();
  }

  getWalletName = () => {
    return WALLET_TYPE.COINBASE_WALLET;
  }
}
