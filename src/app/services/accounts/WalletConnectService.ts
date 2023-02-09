import Web3 from "web3";
import { WALLET_TYPE } from "src/app/configs/constants";
import BaseWalletService from "src/app/services/accounts/BaseWalletService";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { NETWORKS } from "src/app/configs/env";

export default class WalletConnectService extends BaseWalletService {
  walletConnector: any

  constructor(props?: any) {
    super(props);
    this.wallet.needTobeInitiated = true;
  }

  initiateWallet = async (): Promise<boolean> => {
    const network = NETWORKS[this.wallet.chainId];

    try {
      this.walletConnector = new WalletConnectProvider({
        rpc: { [network.id]: network.nodes[0] },
        chainId: network.id
      });

      await this.walletConnector.enable();

      this.wallet.ethereum = this.walletConnector;
      this.wallet.web3 = new Web3(this.walletConnector);

      return true;
    } catch (e) {
      return false;
    }
  }

  getWalletType = () => {
    return WALLET_TYPE.WALLET_CONNECT;
  }
}