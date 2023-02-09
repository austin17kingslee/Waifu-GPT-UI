import { AppThunk, selectAccount, selectGlobal } from "src/app/redux";
import { appendTrackingTx } from "src/app/redux/tx/txSlice";
import moment from "moment";
import { TX_STATUS } from "src/app/configs/constants";
import { getTxObject } from "src/app/services/web3/txService";

export const broadcastTx = (
  actionId: number,
  payload: any,
  onSuccess?: any,
  value = "0",
  topic = ""
): AppThunk => async (dispatch, getState) => {
  const { address, wallet } = selectAccount(getState());
  const { web3Service } = selectGlobal(getState());

  // dispatch(setGlobalModal("loading", { active: true, text: "Waiting for your TX confirmation", }));

  if (!web3Service) {
    // dispatch(setGlobalModal('error', { active: true, data: "Web3 Service is not ready, please try again later." }));
    return;
  }

  try {
    const txObject = getTxObject(actionId, {
      web3Service,
      payload: payload,
      tx: { address, value },
    });

    if (txObject === null) {
      // dispatch(setGlobalModal('error', { active: true, data: "Cannot build TX data." }));
      return;
    }

    const txHash = await wallet.makeTransaction(txObject);

    if (payload && !payload.keepModal) {
      // modalService.close();
    }

    dispatch(appendTrackingTx({
      action: actionId,
      from: address,
      to: txObject.to,
      timeStamp: moment().unix(),
      hash: txHash,
      status: TX_STATUS.PENDING,
      data: payload,
      onSuccess: onSuccess,
      topic: topic
    }));
  } catch (e: any) {
    // dispatch(setGlobalModal('error', {
    //   active: true,
    //   data: typeof e === "string" ? e : e.message
    // }));
    return;
  }

  // dispatch(setGlobalModal("loading"));
};
