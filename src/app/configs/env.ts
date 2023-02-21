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
  42161: {
    id: 42161,
    name: "Arbitrum One",
    symbol: "ETH",
    decimals: 18,
    defaultGasPrice: 0.1,
    timeout: 5000,
    explorer: 'https://arbiscan.io/',
    nodes: [
      "https://arb1.arbitrum.io/rpc"
    ],
    contract: {},
    api: {}
  },
};