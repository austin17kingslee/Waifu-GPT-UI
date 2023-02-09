import { fromChainIdToName, toBigAmount, toHex } from "src/app/utils/helpers";
import { Network, TxObject, WalletObject } from "src/app/types/types";
import { createSignedMessage } from "src/app/factories/txFactory";
import { NETWORKS } from "src/app/configs/env";

export default class BaseWalletService {
  wallet: WalletObject;

  constructor(props: WalletObject) {
    this.wallet = props;
  }

  connect = async (errorHandler: any) => {
    if (!this.wallet.web3 && !this.wallet.ethereum) {
      errorHandler("Something went wrong with the wallet connection.");
      return false;
    }

    if (this.wallet.ethereum.overrideIsMetaMask === true) {
      errorHandler("There is another wallet extension installed other than Metamask, please disable them first.");
      return false;
    }

    const currentChainId = await this._getCurrentChainId();

    if (!currentChainId) {
      errorHandler("Cannot find current chain ID");
      return false;
    } else if (currentChainId !== this.wallet.chainId) {
      const isSwitchSuccess = await this._requestSwitchChain(this.wallet.chainId);
      if (!isSwitchSuccess) return false;
    }

    const connectedAddress = await this._requestAccounts();

    if (!connectedAddress) {
      errorHandler("Cannot find any available addresses.");
      return false;
    }

    this.wallet.address = connectedAddress

    return connectedAddress.toLowerCase();
  };

  getDisconnected = (clearAccount?: any, importAccount?: any, wallet?: any) => {
    if (!this.wallet.ethereum) return;

    this.wallet.ethereum.on('accountsChanged', async (accounts: any) => {
      const isError = await this._throwErrorOnNetworkError(clearAccount);
      if (isError) return;

      if (accounts.length === 0) {
        clearAccount();
        localStorage.clear();
        return;
      }

      if (accounts[0] === this.wallet.address) return;

      this.wallet.address = await this._requestAccounts();

      if (wallet) {
        wallet.address = this.wallet.address;
        importAccount(this.wallet.address, wallet, wallet.getWalletType());
      }
    });

    this.wallet.ethereum.on('chainChanged', (chainId: any) => {
      if (+chainId === this.wallet.chainId) return;
      clearAccount();
      localStorage.clear();
    });

    this.wallet.ethereum.on("disconnect", () => {
      clearAccount();
      localStorage.clear();
    });
  };

  makeTransaction = async (txObject: TxObject): Promise<string> => {
    try {
      await this._throwErrorOnNetworkError();
      return await this.sendTransaction(txObject);
    } catch (error: any) {
      throw Error(error);
    }
  };

  sendTransaction = (txObject: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!this.wallet.web3) return "";
      this.wallet.web3.eth.sendTransaction(txObject, function (err: any, txHash: string) {
        if (!err) {
          resolve(txHash);
        } else {
          let errorMessage = err.message;

          if (err.code === -32000) {
            errorMessage = 'Your BNB balance is insufficient to make the transaction.';
          } else if (err.code === -32602) {
            errorMessage = 'Your current address is different from your previously imported one. Please re-import your address to make the transaction.';
          } else if (err.code === 4100) {
            errorMessage = 'You are not authorized to interact with this address. Please re-import your address to make the transaction.';
          }

          reject(errorMessage);
        }
      })
    })
  };

  signData = async (
    account: string,
    signedData: any,
    signedType: any,
    contractName: string
  ) => {
    const msgParams = createSignedMessage(
      this.wallet.chainId,
      contractName,
      signedData,
      signedType
    );

    const signature = await this.wallet.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [account, JSON.stringify(msgParams)],
    });

    return { signature, msgParams }
  }

  _throwErrorOnNetworkError = async (actionOnError?: any) => {
    let isError = false;
    const currentChainId = await this._getCurrentChainId();

    if (!currentChainId || currentChainId !== this.wallet.chainId) {
      if (actionOnError) {
        actionOnError();
      } else {
        throw Error(`Please make sure that your wallet is on ${fromChainIdToName(this.wallet.chainId)}`);
      }

      isError = true;
    }

    return isError;
  }

  _getCurrentChainId = async () => {
    let chainId;

    if (this.wallet.ethereum) {
      chainId = this.wallet.ethereum.chainId;

      if (!chainId) {
        chainId = await this.wallet.ethereum.request({ method: 'eth_chainId' });
        chainId = toBigAmount(chainId, 0);
      }
    } else if (this.wallet.web3) {
      chainId = await this.wallet.web3.eth.net.getId();
    }

    return +chainId;
  };

  _requestSwitchChain = async (chainId: number): Promise<boolean> => {
    try {
      await this.wallet.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(chainId) }],
      });

      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        const network: Network = NETWORKS[chainId];
        try {
          await this.wallet.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: toHex(chainId),
              chainName: network.name,
              rpcUrl: network.nodes[0],
              blockExplorerUrls: [network.explorer],
              nativeCurrency: network.symbol
            }],
          });
        } catch (addError) {
          console.log(addError);
        }
      }

      console.log(switchError);
    }

    return false;
  }

  _requestAccounts = async () => {
    let accounts;

    try {
      if (this.wallet.ethereum) {
        accounts = await this.wallet.ethereum.request({ method: 'eth_requestAccounts' });
      }
    } catch (e) {
      console.log(e);
    }

    if (this.wallet.web3 && (!accounts || accounts.length === 0)) {
      accounts = await this.wallet.web3.eth.getAccounts();
    }

    const legacyAccount = accounts ? accounts[0] : null;
    const newAccount = accounts.result ? accounts.result[0] : null;

    return legacyAccount ? legacyAccount : newAccount;
  };
}