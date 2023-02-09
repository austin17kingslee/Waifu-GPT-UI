import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { BlockData } from "src/app/types/types";
import { NETWORKS } from "src/app/configs/env";

const ERC20ABI = require("src/app/configs/ABIs/ERC20.json");

export default class Web3Service {
  web3: Web3;
  ethereum: any;
  erc20Contract: Contract;

  constructor(chainId: number) {
    const { web3, ethereum } = this.initiateWeb3Object(chainId);
    this.web3 = web3;
    this.ethereum = ethereum;
    this.erc20Contract = new this.web3.eth.Contract(ERC20ABI);
  }

  initiateWeb3Object(chainId: number) {
    let web3;
    const ethereum = window.ethereum;

    if (ethereum) {
      web3 = new Web3(ethereum as any);
    } else {
      const network = NETWORKS[chainId];
      const provider = new Web3.providers.HttpProvider(network.nodes[0]);
      web3 = new Web3(provider);
    }

    return { web3, ethereum };
  }

  fetchBlock = async (blockNumber?: number): Promise<BlockData> => {
    const block = await this.web3.eth.getBlock(blockNumber ?? "latest");

    let number = 0;
    let timestamp = 0;
    if (block) {
      number = block.number;
      timestamp = +block.timestamp;
    }

    return { number, timestamp };
  }

  fetchTokenAllowance = async (address: string, spender: string, tokenAddress: string): Promise<string> => {
    this.erc20Contract.options.address = tokenAddress;
    return await this.erc20Contract.methods.allowance(address, spender).call();
  };
}
