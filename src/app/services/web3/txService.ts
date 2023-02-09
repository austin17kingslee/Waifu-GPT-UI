import { TX_ACTION, TX_STATUS } from "src/app/configs/constants";
import { getBiggestNumber, toHex, toWei } from "src/app/utils/helpers";
import { TxData, txDataObject, TxHistoryRecord, TxObject } from "src/app/types/types";
import Web3Service from "src/app/services/web3/Web3Service";

export function getTxObject(actionId: number, data: txDataObject): TxObject | null {
  let txObject: TxObject | null = null;

  if (actionId === TX_ACTION.APPROVE_TOKEN) {
    txObject = _getApproveTxObject(data);
  }

  return txObject;
}

export async function updateTxsStatus(
  web3Service: Web3Service,
  txs: TxHistoryRecord[]
): Promise<TxHistoryRecord[]> {
  try {
    for (let i = 0; i < txs.length; i++) {
      const tx = txs[i];
      const txHash = tx.hash;

      if (tx.status === TX_STATUS.PENDING) {
        const { status, log } = await _checkTxMined(web3Service, txHash, tx.topic);

        switch (status) {
          case true:
            tx.status = TX_STATUS.SUCCESS;
            if (tx.onSuccess) tx.onSuccess(txHash, log);
            break;
          case false:
            tx.status = TX_STATUS.FAILED;
            if (tx.onFailed) tx.onFailed(txHash);
            break;
          default:
            tx.status = TX_STATUS.PENDING;
            break;
        }

        if (tx.status !== TX_STATUS.PENDING && tx.onDone) {
          tx.onDone(txHash);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return txs;
}

async function _checkTxMined(web3Service: Web3Service, txHash: string, topic: string) {
  const receipt = await web3Service.web3.eth.getTransactionReceipt(txHash);
  let status: boolean | null = null;
  let log;

  if (receipt !== null) {
    if (topic === "") {
      status = receipt.status;
    } else {
      const logs = receipt.logs;
      const blockNumber = receipt.blockNumber;

      if (!blockNumber) {
        status = null;
      } else if (!logs.length) {
        status = false;
      } else {
        for (let i = 0; i < logs.length; ++i) {
          if (logs[i].topics[0].toLowerCase() === topic.toLowerCase()) {
            log = logs[i];
            status = true;
            break;
          }
        }
      }
    }
  }

  return { status, log }
}

function _getApproveTxObject(data: txDataObject) {
  const allowanceAmount = getBiggestNumber();
  const methodData = data.web3Service.erc20Contract.methods.approve(data.payload.spender, allowanceAmount).encodeABI();
  return _getTxObject(data.payload.tokenAddress, methodData, data.tx);
}

function _getTxObject(
  contractAddress: string,
  methodData: string,
  txData: TxData
) {
  let txObject: TxObject = {
    from: txData.address,
    to: contractAddress,
    value: txData.value !== undefined ? txData.value : '0x0',
    data: methodData,
    gasPrice: toHex(toWei(5))
  };

  if (txData.nonce !== undefined) txObject.nonce = toHex(txData.nonce);
  if (txData.gas !== undefined) txObject.gas = toHex(txData.gas);

  return txObject;
}