import React, { useEffect, useRef } from 'react';
import { INTERVAL, MODAL_KEY, TX_STATUS } from "src/app/configs/constants";
import { findByValue } from "src/app/utils/helpers";
import { selectAccount, selectGlobal, selectTx, useAppDispatch, useAppSelector } from "src/app/redux";
import { setTrackingTxs } from "src/app/redux/tx/txSlice";
import { registerModal, setWeb3Service } from "src/app/redux/global/globalSlice";
import { updateTxsStatus } from "src/app/services/web3/txService";
import Web3Service from "src/app/services/web3/Web3Service";
import TxTrackingModal from "src/app/components/Commons/Modals/TxTrackingModal";

export default function useFetchingData() {
  const dispatch = useAppDispatch();
  const { web3Service } = useAppSelector(selectGlobal);
  const { chainId } = useAppSelector(selectAccount);
  const { trackingTxs } = useAppSelector(selectTx);
  const txInterval = useRef<any>();

  /** Initiate Web3Service **/
  useEffect(() => {
    function initiateWeb3Service() {
      let service = web3Service;
      if (!service) {
        service = new Web3Service(chainId);
        dispatch(setWeb3Service(service));
      }
      return service
    }

    initiateWeb3Service();
  }, [chainId]); // eslint-disable-line

  /** Tracking pending transaction **/
  useEffect(() => {
    function clearTxInterval() {
      clearInterval(txInterval.current);
    }

    if (trackingTxs.length === 0 || !web3Service) return;

    clearTxInterval();

    dispatch(registerModal({
      key: MODAL_KEY.TX_TRACKING,
      content: <TxTrackingModal />
    }));

    txInterval.current = setInterval(async () => {
      const updatedTxs = await updateTxsStatus(web3Service, trackingTxs);
      const pendingTx = findByValue(updatedTxs, 'status', TX_STATUS.PENDING);

      if (!pendingTx) {
        clearTxInterval();
        dispatch(setTrackingTxs(updatedTxs));
      }
    }, INTERVAL.PENDING_TX);

    return () => {
      clearTxInterval();
    };
  }, [trackingTxs.length, web3Service]); // eslint-disable-line
}
