import { WALLET_TYPE, WAIFU_COMMANDS } from "src/app/configs/constants";
import MetamaskService from "src/app/services/accounts/MetamaskService";
import WalletConnectService from "src/app/services/accounts/WalletConnectService";
import DappService from "src/app/services/accounts/DappService";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import moment from "moment";
import CoinbaseWalletService from "src/app/services/accounts/CoinbaseWalletService";
import Web3Service from "src/app/services/web3/Web3Service";
import { Network, WalletObject } from "src/app/types/types";
import { NETWORKS } from "src/app/configs/env";

export function isInDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getWalletParams(
  chainId: number,
  address?: string
): WalletObject {
  const network: Network = NETWORKS[chainId];
  const web3Service = new Web3Service(chainId);

  return {
    chainId: network.id,
    chainName: network.name,
    node: network.nodes[0],
    nodeTimeout: network.timeout,
    web3: web3Service.web3,
    ethereum: web3Service.ethereum,
    address: address,
  };
}

export function generateLottieData(json: any) {
  return {
    loop: true,
    autoplay: true,
    animationData: json.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
}

export function initiateWalletService(
  chainId: number,
  address: string,
  type: string
) {
  let walletService: MetamaskService | WalletConnectService | CoinbaseWalletService | DappService | null = null;
  const props = getWalletParams(chainId, address);

  if (type === WALLET_TYPE.METAMASK) {
    walletService = new MetamaskService(props);
  } else if (type === WALLET_TYPE.WALLET_CONNECT) {
    walletService = new WalletConnectService(props);
  } else if (type === WALLET_TYPE.COINBASE_WALLET) {
    walletService = new CoinbaseWalletService(props);
  } else if (type === WALLET_TYPE.DAPP) {
    walletService = new DappService(props);
  }

  return walletService;
}

export function fromChainIdToName(chainId: number) {
  let chainName = "Unknown Network";

  if (chainId === 1) {
    chainName = "Ethereum";
  } else if (chainId === 3) {
    chainName = "Ropsten";
  } else if (chainId === 4) {
    chainName = "Rinkeby";
  } else if (chainId === 5) {
    chainName = "Goerli Test";
  } else if (chainId === 42) {
    chainName = "Kovan";
  } else if (chainId === 97) {
    chainName = "BSC testnet";
  } else if (chainId === 56) {
    chainName = "BNB Chain";
  } else if (chainId === 137) {
    chainName = "Polygon";
  } else if (chainId === 43114) {
    chainName = "Avalanche Network";
  }

  return chainName;
}

export function getBiggestNumber() {
  return "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
}

export function checkIsMetamask() {
  return window.ethereum && window.ethereum.isMetaMask;
}

export function formatBigNumber(number: number | string, decimals = 18, precision = 0): any {
  if (!number) return "0";

  const bigNumber = new BigNumber(number.toString());
  const result = bigNumber.div(Math.pow(10, decimals));
  if (precision !== 0) {
    return formatNumber(result, precision);
  }

  return result.toString();
}

export function roundNumber(number: number | string, precision = 6, isFormatted = false) {
  if (!number) return 0;

  const amountBigNumber = new BigNumber(number);
  const amountString = amountBigNumber.toFixed().toString();
  const indexOfDecimal = amountString.indexOf(".");
  const roundedNumber = indexOfDecimal !== -1 ? amountString.slice(0, indexOfDecimal + (precision + 1)) : amountString;

  return isFormatted ? formatNumber(roundedNumber, precision) : roundedNumber;
}

export function formatNumber(number: any, decimals?: number) {
  if (+number === 0) return 0;

  const formattedDecimals = decimals === undefined ? 0 : decimals;
  if (number < 1000) return toMeaningfulNumber(+number, decimals === undefined ? 20 : formattedDecimals);

  let bigNumber = new BigNumber(number);
  let formattedNumber = bigNumber.toFormat(formattedDecimals);
  const numberParts = formattedNumber.split(".");

  if (numberParts.length === 2 && !+numberParts[1]) {
    formattedNumber = numberParts[0];
  }

  return formattedNumber;
}

export function formatAddress(address: string, first = 10, last = -4) {
  if (!address) return "";
  return `${address.slice(0, first)}...${address.slice(last)}`;
}

export function isAddress(address: string) {
  return Web3.utils.isAddress(address);
}

export function toGwei(number: number | string) {
  const bigNumber = new BigNumber(number.toString());
  return bigNumber.div(1000000000).toString();
}

export function toWei(number: number | string) {
  return toBigAmount(number, 9);
}

export function toBigAmount(number: number | string, decimal = 18) {
  const bigNumber = new BigNumber(number.toString());
  return bigNumber.times(Math.pow(10, decimal)).toFixed(0);
}

export function toHex(number: string | number) {
  const bigNumber = new BigNumber(number);
  return "0x" + bigNumber.toString(16);
}

export function findByValue(array: any, key: string, value: any) {
  return array.find((item: any) => {
    return item[key] === value;
  });
}

export function isEmptyObject(object: any) {
  return Object.keys(object).length === 0;
}

export function toMeaningfulNumber(number: number, decimals: number): number {
  const meaningfulNumber = number.toFixed(decimals).match(/^-?\d*\.?0*\d{0,4}/);
  if (!meaningfulNumber) return 0;
  return +meaningfulNumber[0];
}

export function shortenNumber(number: number) {
  const symbol = ["", "K", "M", "B", "T", "P", "E"];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = symbol[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}

export function timeAgo(timestamp: string | number) {
  return moment(timestamp).fromNow();
}

export function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, time);
  });
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmptyHistory(history: any) {
  return !!history && history.length === 1;
}

export function onBackClicked(history: any) {
  history.goBack();
}


export function getPromtString(text: string, cmd: string) {
  const command = text.substring(0, cmd.length);
  if (command !== cmd) {
    return {
      promt: '',
      err: `Sorry I can't understand you! Command needs to follow this format: /${cmd}[space]word_1,word_2,...,word_n`
    }
  }
  const words = text.substring(cmd.length).split(',');
  const promptString = words.join(',');
  return {
    promt: promptString,
    err: null
  };
}