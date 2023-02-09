import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TxHistoryRecord } from "src/app/types/types";

interface TxState {
  txError: string,
  txConfirming: boolean,
  trackingTxs: TxHistoryRecord[],
  successTxCount: number
}

const initialState: TxState = {
  txError: '',
  txConfirming: false,
  trackingTxs: [],
  successTxCount: 0,
};

const txSlice = createSlice({
  name: 'tx',
  initialState,
  reducers: {
    appendTrackingTx(state, action: PayloadAction<TxHistoryRecord>) {
      state.trackingTxs.push(action.payload);
    },
    setTrackingTxs(state, action: PayloadAction<TxHistoryRecord[]>) {
      state.trackingTxs = action.payload;
      state.successTxCount = state.successTxCount + 1;
    },
    setTxError(state, action: PayloadAction<string>) {
      state.txError = action.payload;
    },
    setTxConfirming(state, action: PayloadAction<boolean>) {
      state.txConfirming = action.payload;
    }
  }
});

export const { appendTrackingTx, setTrackingTxs, setTxError, setTxConfirming } = txSlice.actions;
export const txReducer = txSlice.reducer;