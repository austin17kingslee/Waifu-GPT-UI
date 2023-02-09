/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: boolean
    networkVersion: string
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  web3?: {}
}