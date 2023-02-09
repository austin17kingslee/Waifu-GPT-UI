import React from "react";
import broadcastedIcon from "src/assets/images/icons/status-broadcasted.svg";
import doneIcon from "src/assets/images/icons/status-done.svg";
import failedIcon from "src/assets/images/icons/status-failed.svg";
import loadingIcon from "src/assets/images/icons/loading-circle.svg";
import externalLinkIcon from "src/assets/images/icons/external-link.svg";
import { TX_ACTION, TX_STATUS } from "src/app/configs/constants";
import { formatAddress } from "src/app/utils/helpers";
import { TxHistoryRecord } from "src/app/types/types";
import { NETWORKS } from "src/app/configs/env";
import { selectAccount, selectTx, useAppSelector } from "src/app/redux";

export default function TxTrackingModal() {
  const { chainId } = useAppSelector(selectAccount);
  const { trackingTxs } = useAppSelector(selectTx);

  const lastTx: TxHistoryRecord = trackingTxs[trackingTxs.length - 1] ?? {};
  const network = NETWORKS[chainId];
  const content = renderDataByStatus();

  function renderDataByStatus() {
    let data;

    if (lastTx.status === TX_STATUS.SUCCESS) {
      data = {
        icon: doneIcon,
        content: renderSuccessDataByTxType(lastTx.action, lastTx.data)
      };
    } else if (lastTx.status === TX_STATUS.FAILED) {
      data = {
        icon: failedIcon,
        content: <div className='flex-center-center mb-3'>Transaction error</div>
      };
    } else {
      data = {
        icon: broadcastedIcon,
        content: (
          <div className='flex-start-center mb-7'>
            <img className='circle-loading' src={loadingIcon} alt='loading'/>
            <div>Waiting for the transaction to be mined</div>
          </div>
        )
      };
    }

    return data;
  }

  function renderSuccessDataByTxType(txType: number, txData: any) {
    let content;

    if (txType === TX_ACTION.APPROVE_TOKEN) {
      content = (
        <div className='tx-tracking__content'>
          <div>Successfully Approved</div>
          <div>Approved token to contract {formatAddress(txData.spender)}</div>
        </div>
      )
    }

    return content;
  }

  return (
    <div className="tx-tracking">
      <div className='flex-center-center mb-5'>
        <img className='mr-1' src={content.icon} alt={lastTx.status} />
        <div className='uppercase'>{lastTx.status}!</div>
      </div>
      <div className="basic-modal__content">
        <div>{content.content}</div>
        <div className='tx-tracking__hash'>
          <div>TxHash:</div>
          <div className='flex-center-start'>
            <div className='mr-2'>{formatAddress(lastTx.hash, 20, -5)}</div>
            <a href={`${network.explorer}/tx/${lastTx.hash}`} target='_blank' rel='noopener noreferrer'>
              <img className='top-1' src={externalLinkIcon} alt='Show tx' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}