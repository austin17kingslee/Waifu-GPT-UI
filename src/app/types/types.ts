import Web3Service from "src/app/services/web3/Web3Service";
import Web3 from "web3";
import { ReactNode } from "react";

export type WalletObject = {
  chainId: number
  chainName: string
  node: string
  nodeTimeout: number
  web3?: Web3
  ethereum?: any
  address?: string
  needTobeInitiated?: boolean
}

export type TxHistoryRecord = {
  from: string
  to: string
  timeStamp: number
  hash: string
  action: number
  data: any
  gas?: number
  gasPrice?: number
  gasUsed?: number
  isError?: string
  status?: string
  onSuccess?: any
  onFailed?: any
  onDone?: any
  topic?: any
}

export type TxObject = {
  from: string
  to: string
  value: string
  data: string
  nonce?: string
  gasPrice?: string
  gas?: string
}

export type TxData = {
  address: string
  gasPrice?: string
  gas?: string
  nonce?: string
  value?: string
}

export type BlockData = {
  number: number
  timestamp: number
}

export type Network = {
  id: number
  name: string
  symbol: string
  decimals: number
  defaultGasPrice: number
  timeout: number
  explorer: string
  nodes: string[]
  contract: any
  api: any
}

export type txDataObject = {
  web3Service: Web3Service
  payload: any
  tx: TxData
}

export type Modal = {
  key: string,
  content: ReactNode,
  active?: boolean,
  title?: string,
  className?: string,
  submitText?: string,
  onSubmit?: any,
  isSubmitDisabled?: boolean,
  closeText?: string,
  onClose?: any,
  hidePanel?: boolean,
  hideXBtn?: boolean,
  width?: number,
  layer?: number,
}