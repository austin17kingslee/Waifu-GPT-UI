import { Network } from "src/app/types/types";

export const API = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
}

export const NETWORKS: {[key: number]: Network} = {
  1: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    defaultGasPrice: 5,
    timeout: 5000,
    explorer: 'https://etherscan.io/',
    nodes: [
      "https://mainnet.infura.io/v3/fb69eb42745f4551952a762e7b10f646"
    ],
    contract: {},
    api: {}
  },
  3: {
    id: 3,
    name: "Ropsten",
    symbol: "ETH",
    decimals: 18,
    defaultGasPrice: 5,
    timeout: 5000,
    explorer: 'https://ropsten.etherscan.io/',
    nodes: [
      "https://ropsten.infura.io/v3/fb69eb42745f4551952a762e7b10f646"
    ],
    contract: {},
    api: {}
  },
  56: {
    id: 56,
    name: "BNB Chain",
    symbol: "BNB",
    decimals: 18,
    defaultGasPrice: 5,
    timeout: 5000,
    explorer: 'https://bscscan.com/',
    nodes: [
      "https://bsc-dataseed.binance.org/"
    ],
    contract: {},
    api: {}
  },
  137: {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    decimals: 18,
    defaultGasPrice: 5,
    timeout: 5000,
    explorer: 'https://polygonscan.com/',
    nodes: [
      "https://polygon-rpc.com/"
    ],
    contract: {},
    api: {}
  },
  43114: {
    id: 43114,
    name: "Avalanche Network",
    symbol: "AVAX",
    decimals: 18,
    defaultGasPrice: 5,
    timeout: 5000,
    explorer: 'https://snowtrace.io/',
    nodes: [
      "https://api.avax.network/ext/bc/C/rpc/"
    ],
    contract: {},
    api: {}
  }
};