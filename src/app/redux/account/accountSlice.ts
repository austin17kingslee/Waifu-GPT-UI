import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from "redux-persist/lib/constants";
import { initiateWalletService } from "src/app/utils/helpers";
import { DEFAULT_CHAIN_ID } from "src/app/configs/constants";

interface AccountData {
  address: string,
  type: string,
  wallet: any,
}

interface AccountState extends AccountData {
  chainId: number
}

const initialState: AccountState = {
  chainId: DEFAULT_CHAIN_ID,
  address: '',
  type: '',
  wallet: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setChainId(state, action: PayloadAction<number>) {
      state.chainId = action.payload;
    },
    importAccount(state, action: PayloadAction<AccountData>) {
      const { address, wallet, type } = action.payload;

      state.address = address.toLowerCase();
      state.wallet = wallet;
      state.type = type;
    },
    clearAccount() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: any) => {
      const lastData = action.payload;

      if (action.key === 'account' && lastData && lastData.type) {
        const wallet = initiateWalletService(
          lastData.chainId,
          lastData.address,
          lastData.type
        );

        if (wallet) {
          state.wallet = wallet;
        } else {
          state.address = initialState.address;
          state.wallet = initialState.wallet;
          state.type = initialState.type;
        }
      }
    });
  }
});

export const { setChainId, importAccount, clearAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;