import { TxObject } from "src/app/types/types";

export function createTxObject(data: any): TxObject {
  return {
    from: data.from,
    to: data.to,
    value: data.value,
    data: data.data,
    nonce: data.nonce,
    gasPrice: data.gasPrice,
    gas: data.gas
  };
}

export function createSignedMessage(
  chainId: number,
  contractName: string,
  singedData: any,
  signedTypes: any,
  primaryType = "Group"
) {
  return {
    domain: {
      chainId: chainId,
      name: contractName,
      version: "1",
    },
    message: singedData,
    primaryType,
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" }
      ],
      ...signedTypes
    }
  }
}